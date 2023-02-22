import React, { useEffect } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function SessionFormPage() {
  const history = useHistory();
  const [venueID, setVenueID] = useState("");
  const [buyIn, setBuyIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [stakes, setStakes] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const venue = useSelector(
    (store) => store.venuesReducer.getSpecificVenueReducer
  );

  useEffect(() => {
    venue[0] !== undefined && setVenueID(venue[0].ven_id);
  }, [venue]);

  console.log(venueID);

  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: id });
  }, []);

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
    history.push(`/venue-view/${venueID}`);
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
        <button onClick={addSession}>Add Session</button>
      </div>
    </>
  );
}
