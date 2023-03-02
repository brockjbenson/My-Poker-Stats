import React, { useEffect } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";
import "./SessionFormPage.css";

export default function SessionFormPage() {
  const history = useHistory();
  const [venueID, setVenueID] = useState("");
  const [venName, setVenName] = useState("");
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
    venue[0] !== undefined && setVenName(venue[0].name);
  }, [venue]);

  console.log(venueID);

  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: venueID });
  }, []);

  function cancelAdd() {
    history.push(`/venue-view/${venueID}`);
  }

  function addSession(e) {
    e.preventDefault();
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
    dispatch({ type: "FETCH_VENUES_SESSIONS", payload: venueID });
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
      <div className="main">
        <div className="header">
          <h1 className="clr-light">Add Session to:</h1>
          <h2 className="clr-light">{venName}</h2>
          <div className="buttons-container"></div>
        </div>
        <form onSubmit={addSession} className="add-session">
          <div className="form-inputs">
            <div className="row-1">
              <input
                type="number"
                placeholder="In For"
                onChange={(e) => setBuyIn(e.target.value)}
                value={buyIn}
                required
              />
              <input
                type="number"
                placeholder="Out For"
                onChange={(e) => setCashOut(e.target.value)}
                value={cashOut}
                required
              />
            </div>
            <div className="row-2">
              <input
                type="date"
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
              />
              <input
                type="number"
                placeholder="Duration"
                onChange={(e) => setHours(e.target.value)}
                value={hours}
                required
              />
              <input
                type="text"
                placeholder="Stakes"
                onChange={(e) => setStakes(e.target.value)}
                value={stakes}
                required
              />
            </div>
            <div className="row-3">
              <textarea
                required
                placeholder="Notes"
                onChange={(e) => setNotes(e.target.value)}
                maxLength={1000}
              />
            </div>
          </div>
          <div className="submit-button">
            <button className="btn-sm-primary" type="submit">
              Add
            </button>
            <button className="btn-sm-light" onClick={cancelAdd}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="nav">
        <Nav />
      </div>
    </>
  );
}
