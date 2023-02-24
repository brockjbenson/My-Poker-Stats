import React, { useEffect } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";
import "../EditSessionPage/EditSessionPage.css";

export default function EditSessionPage() {
  const history = useHistory();
  const [sessionID, setSessionId] = useState("");
  const [venName, setVenName] = useState("");
  const [venId, setVenID] = useState("");
  const [buyIn, setBuyIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [stakes, setStakes] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  const { id, venid } = useParams();
  const session = useSelector(
    (store) => store.venuesReducer.getSpecificSessionReducer
  );

  useEffect(() => {
    session[0] !== undefined && setVenName(session[0].venue);
    session[0] !== undefined && setSessionId(session[0].id);
    session[0] !== undefined && setBuyIn(session[0].buy_in);
    session[0] !== undefined && setCashOut(session[0].cash_out);
    session[0] !== undefined && setHours(session[0].hours_played);
    session[0] !== undefined && setStakes(session[0].stakes);
    session[0] !== undefined && setNotes(session[0].notes);
  }, [session]);

  console.log("session id", sessionID);

  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: id });
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: venid });
  }, []);

  function cancelEdit() {
    history.push(`/session-view/${id}/${venid}`);
  }

  function editSession(e) {
    e.preventDefault();
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
  return (
    <div className="body-container">
      <div className="main-container">
        <div className="edit-session-heading clr-light">
          <h1>Edit Session</h1>
        </div>
        <form className="session-form" onSubmit={editSession}>
          <div className="inputs">
            <div className="input-container r1">
              <p className="clr-light">Venue</p>
              <input
                type="text"
                value={venName}
                onChange={(e) => setBuyIn(e.target.value)}
                readOnly
                required
              />
            </div>
            <div className="input-container r2">
              <p className="clr-light">Buy In</p>
              <input
                type="number"
                value={buyIn}
                onChange={(e) => setBuyIn(e.target.value)}
                required
              />
            </div>
            <div className="input-container r2">
              <p className="clr-light">Cash Out</p>
              <input
                type="number"
                value={cashOut}
                onChange={(e) => setCashOut(e.target.value)}
                required
              />
            </div>
            <div className="input-container r3">
              <p className="clr-light">Hours Played</p>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>
            <div className="input-container r3">
              <p className="clr-light">Date</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="input-container r4">
              <p className="clr-light">Stakes</p>
              <input
                type="text"
                value={stakes}
                onChange={(e) => setStakes(e.target.value)}
                required
              />
            </div>
            <div className="input-container r5">
              <p className="clr-light">Notes</p>
              <textarea
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
                maxlength="150"
              />
            </div>
          </div>
          <div className="button-container">
            <button className="btn-sm-primary" type="submit">
              Save
            </button>
            <button className="btn-sm-light" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}
