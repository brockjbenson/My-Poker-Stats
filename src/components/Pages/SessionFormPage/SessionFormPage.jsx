import React, { useEffect } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";
import "../EditSessionPage/EditSessionPage.css";

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
    <div className="body-container">
      <div className="main-container">
        <div className="add-session-heading clr-light">
          <h1>Add Session</h1>
        </div>
        <form className="session-form" onSubmit={addSession}>
          <div className="inputs">
            <div className="input-container r1">
              <p className="clr-light">Venue</p>
              <input type="text" value={venName} readOnly required />
            </div>
            <div className="input-container r2">
              <p className="clr-light">Buy In</p>
              <input
                type="number"
                value={buyIn}
                onChange={(e) => setBuyIn(e.target.value)}
                placeholder="100"
                required
              />
            </div>
            <div className="input-container r2">
              <p className="clr-light">Cash Out</p>
              <input
                type="number"
                value={cashOut}
                onChange={(e) => setCashOut(e.target.value)}
                placeholder="200.25"
                required
              />
            </div>
            <div className="input-container r3">
              <p className="clr-light">Hours Played</p>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="5.3"
                required
              />
            </div>
            <div className="input-container r3">
              <p className="clr-light">Date</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Eg. 02/02/2023"
                required
              />
            </div>
            <div className="input-container r4">
              <p className="clr-light">Stakes</p>
              <input
                type="text"
                value={stakes}
                onChange={(e) => setStakes(e.target.value)}
                placeholder="Eg. 1/2"
                required
              />
            </div>
            <div className="input-container r5">
              <p className="clr-light">Notes</p>
              <textarea
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Eg. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis, massa vel pharetra consectetur, enim orci consequat ligula, a luctus."
                required
                maxLength="150"
              />
            </div>
          </div>
          <div className="button-container">
            <button className="btn-sm-primary" type="submit">
              Add Session
            </button>
            <button className="btn-sm-light" onClick={cancelAdd}>
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
