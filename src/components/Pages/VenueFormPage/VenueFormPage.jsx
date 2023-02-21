import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function VenueFormPage() {
  const dispatch = useDispatch();

  const [venueName, setVenueName] = useState("");

  function addVenue() {
    dispatch({ type: "ADD_VENUE", payload: { name: venueName } });
    setVenueName("");
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
