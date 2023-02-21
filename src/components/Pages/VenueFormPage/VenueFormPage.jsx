import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function VenueFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [venueName, setVenueName] = useState("");

  function addVenue() {
    dispatch({ type: "ADD_VENUE", payload: { name: venueName } });
    setVenueName("");
    history.push("/venue-list");
  }
  return (
    <>
      <div className="form">
        <div className="heading">
          <h1>Add Venue</h1>
        </div>
        <input
          type="text"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          placeholder="Venue Name"
        />
        <button onClick={addVenue}>Add Venue</button>
      </div>
    </>
  );
}
