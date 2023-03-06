// ------- Imports ------- //

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import Nav from "../../Shared/Nav/Nav";
import { NumericFormat } from "react-number-format";
import "./SessionViewPage.css";
import { FaPen, FaTrash, FaArrowLeft, FaTimes, FaCheck } from "react-icons/fa";

// ------- Component ------- //
export default function SessionViewPage() {
  // ------- UseEffect ------- //

  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: Number(id) });
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: Number(venid) });
  }, []);

  const session = useSelector(
    (store) => store.sessionsReducer.getSpecificSessionReducer
  );

  const venue = useSelector(
    (store) => store.venuesReducer.getSpecificVenueStatsReducer
  );

  // ------- Import Vars ------- //
  const { id, venid } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [buyIn, setBuyIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [stakes, setStakes] = useState("");
  const [notes, setNotes] = useState("");
  const [venName, setVenName] = useState("");
  const [sessionID, setSessionId] = useState("");

  console.log("venue id:", Number(venid));
  console.log("session:", session);

  useEffect(() => {
    session[0] !== undefined && setVenName(session[0].venue);
    session[0] !== undefined && setSessionId(session[0].id);
    session[0] !== undefined && setBuyIn(session[0].buy_in);
    session[0] !== undefined && setCashOut(session[0].cash_out);
    session[0] !== undefined && setDate(session[0].session_date);
    session[0] !== undefined && setHours(session[0].hours_played);
    session[0] !== undefined && setStakes(session[0].stakes);
    session[0] !== undefined && setNotes(session[0].notes);
  }, [session]);

  function editSession() {
    const sessionObj = {
      id: sessionID,
      buy_in: Number(buyIn),
      cash_out: Number(cashOut),
      hours_played: Number(hours),
      session_date: date,
      stakes: stakes,
      notes: notes,
    };
    dispatch({ type: "EDIT_SESSION", payload: sessionObj });
    history.push(`/session-view/${id}/${venid}`);
    setBuyIn("");
    setCashOut("");
    setStakes("");
    setHours("");
    setDate("");
    setNotes("");
    setSessionId("");
  }
  // ------- Stores ------- //

  // ------- Confirm Delete onClick fn------- //

  function confirmFunction(id) {
    let r = confirm("Are You Sure? You will delete all data for this session!");
    if (r == true) {
      deleteSessionBtn(id);
    } else {
    }
  }

  // ------- Back button fn ------- //

  function goBackToVenue() {
    history.push(`/venue-view/${venid}`);
  }

  // ------- Delete Session fn ------- //

  function deleteSessionBtn(id) {
    dispatch({ type: "DELETE_SESSION", payload: id });
    dispatch({ type: "FETCH_VENUES_SESSIONS" });
    history.push(`/venue-view/${venid}`);
  }

  // ------- Edit Session fn ------- //

  return (
    <div className="body">
      <div className="main">
        <div className="header clr-light">
          {editMode ? (
            <>
              <div className="session-view-heading">
                <h1>Edit Session</h1>
              </div>
              <div className="button-container">
                <FaCheck className="icon-btn-delete" onClick={editSession} />

                <FaTimes
                  className="icon-btn-edit"
                  onClick={() => setEditMode(false)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="session-view-heading">
                <h1>Session</h1>
              </div>
              <div className="button-container">
                <FaTrash
                  className="icon-btn-delete"
                  onClick={() => confirmFunction(sessionID)}
                />

                <FaPen
                  className="icon-btn-edit"
                  onClick={() => setEditMode(true)}
                />
              </div>
            </>
          )}
        </div>
        {session[0] !== undefined && (
          <>
            <div className="stats-container clr-light">
              <div className="stat">
                {editMode ? (
                  <>
                    <p>Cash Out</p>
                    <input
                      className="session-edit-input"
                      type="text"
                      value={cashOut}
                      onChange={(e) => setCashOut(e.target.value)}
                      required
                    />
                  </>
                ) : (
                  <>
                    <p>Net Profit</p>
                    <NumericFormat
                      className="h2"
                      value={session[0].net_profit}
                      prefix={"$"}
                      thousandSeparator=","
                      allowNegative
                      decimalScale={2}
                    />
                  </>
                )}
              </div>
              <div className="stat">
                <p>Date</p>
                {editMode ? (
                  <>
                    <input
                      className="session-edit-input"
                      type="text"
                      value={format(new Date(date), "MM/dd/yy")}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </>
                ) : (
                  <>
                    <h2 className="h2">
                      {format(new Date(session[0].session_date), "MM/dd/yy")}
                    </h2>
                  </>
                )}
              </div>
              <div className="stat">
                <p>Duration</p>
                {editMode ? (
                  <>
                    <input
                      className="session-edit-input"
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      required
                    />
                  </>
                ) : (
                  <>
                    <h2 className="h2">{hours} Hrs</h2>
                  </>
                )}
              </div>
              <div className="stat">
                <p>Buy In</p>
                {editMode ? (
                  <>
                    <input
                      className="session-edit-input"
                      type="number"
                      value={buyIn}
                      onChange={(e) => setBuyIn(e.target.value)}
                      required
                    />
                  </>
                ) : (
                  <>
                    <NumericFormat
                      className="h2"
                      value={session[0].buy_in}
                      prefix={"$"}
                      thousandSeparator=","
                      allowNegative
                      decimalScale={2}
                    />
                  </>
                )}
              </div>
              <div className="stat">
                <p>Stakes</p>
                {editMode ? (
                  <>
                    <input
                      className="session-edit-input"
                      type="text"
                      value={stakes}
                      onChange={(e) => setStakes(e.target.value)}
                      required
                    />
                  </>
                ) : (
                  <>
                    <h2 className="h2">{session[0].stakes}</h2>
                  </>
                )}
              </div>
              <div className="stat">
                <p>Hourly</p>
                {editMode ? (
                  <>
                    <h2>-</h2>
                  </>
                ) : (
                  <>
                    <NumericFormat
                      className="h2"
                      value={session[0].hourly}
                      prefix={"$"}
                      thousandSeparator=","
                      allowNegative
                      decimalScale={2}
                    />
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <div className="card-container bg">
          <div className="notes-container clr-light">
            {editMode ? (
              <>
                <div className="card-section-1b">
                  <h2 className="clr-primary font-md font-wt-bold">
                    Edit Notes
                  </h2>
                </div>
                <div className="notes-body">
                  <textarea
                    className="session-edit-textarea"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                    maxLength="150"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="card-section-session-1b">
                  <FaArrowLeft
                    className="back-button"
                    onClick={goBackToVenue}
                  />
                  <h2 className="clr-primary notes-title font-md font-wt-bold">
                    Notes
                  </h2>
                  <h2></h2>
                </div>
                <div className="notes-body">
                  <p className="font-wt-bold">{notes}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="nav">
        <Nav />
      </div>
    </div>
  );
}
