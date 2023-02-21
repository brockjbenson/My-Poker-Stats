import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [sessionID, setSessionId] = useState("");
  const [venueID, setVenueID] = useState("");
  const [venueName, setVenueName] = useState("");
  const [buyIn, setBuyIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [stakes, setStakes] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const allStats = useSelector((store) => store.allStatsReducer);
  function getSpecific() {
    dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: Number(sessionID) });
    setSessionId("");
  }

  function getSpecificVenue() {
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: Number(venueID) });
    setVenueID("");
  }

  function addVenue() {
    dispatch({ type: "ADD_VENUE", payload: { name: venueName } });
    setVenueName("");
  }

  function addSession() {
    const sessionObj = {
      buy_in: Number(buyIn),
      cash_out: Number(cashOut),
      hours_played: Number(hours),
      session_date: date,
      stakes: stakes,
      notes: notes,
      venue_id: Number(venueID),
    };
    dispatch({ type: "ADD_SESSION", payload: sessionObj });
    setBuyIn("");
    setCashOut("");
    setStakes("");
    setHours("");
    setDate("");
    setNotes("");
    setVenueID("");
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <input
        type="number"
        value={sessionID}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button onClick={getSpecific}>Get Specific Session</button>
      <input
        type="number"
        value={venueID}
        onChange={(e) => setVenueID(e.target.value)}
      />
      <button onClick={getSpecificVenue}>Get Specific Venue</button>
      <input
        type="text"
        value={venueName}
        onChange={(e) => setVenueName(e.target.value)}
        placeholder="Venue Name"
      />
      <button onClick={addVenue}>Add Venue</button>
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
        <input
          type="number"
          value={venueID}
          onChange={(e) => setVenueID(e.target.value)}
          placeholder="Venue ID"
        />
        <button onClick={addSession}>Add Session</button>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
