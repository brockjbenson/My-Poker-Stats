import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function DashBoardPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [sessionID, setSessionId] = useState("");
  const [venueID, setVenueID] = useState("");
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
    </div>
  );
}

// this allows us to use <App /> in index.js
export default DashBoardPage;
