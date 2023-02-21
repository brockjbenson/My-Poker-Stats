import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function SessionFormPage() {
  const [venueID, setVenueID] = useState("");
  const [buyIn, setBuyIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [stakes, setStakes] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();

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
    <>
      <div className="heading">
        <h1>Add Session</h1>
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
        <input
          type="number"
          value={venueID}
          onChange={(e) => setVenueID(e.target.value)}
          placeholder="Venue ID"
        />
        <button onClick={addSession}>Add Session</button>
      </div>
    </>
  );
}
