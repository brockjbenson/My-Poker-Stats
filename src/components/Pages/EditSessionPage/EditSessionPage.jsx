import React, { useEffect } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";

export default function EditSessionPage() {
  const history = useHistory();
  const [sessionID, setSessionId] = useState("");
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
    session[0] !== undefined && setSessionId(session[0].id);
  }, [session]);

  console.log("session id", sessionID);

  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: id });
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: venid });
  }, []);

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
    history.push(`/session-view/${sessionID}/${venid}`);
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
        <div className="heading">
          <h1>Edit Session</h1>
        </div>
        <div className="session-form">
          <input
            type="number"
            value={buyIn}
            onChange={(e) => setBuyIn(e.target.value)}
            placeholder="Buy In"
          />
          <input
            type="number"
            value={cashOut}
            onChange={(e) => setCashOut(e.target.value)}
            placeholder="Cash Out"
          />
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours Played"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date Played"
          />
          <input
            type="text"
            value={stakes}
            onChange={(e) => setStakes(e.target.value)}
            placeholder="Stakes Played"
          />
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Session Notes"
          />
          <button onClick={editSession}>Save</button>
        </div>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}
