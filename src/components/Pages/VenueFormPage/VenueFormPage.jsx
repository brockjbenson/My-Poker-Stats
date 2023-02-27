import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";
import "../VenueFormPage/VenueFormPage.css";

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
    <div className="body">
      <div className="main">
        <div className="header">
          <div className="heading">
            <h1>Add Venue</h1>
          </div>
        </div>
        <div className="venue-form">
          <div className="venue-input">
            <input
              className="add-venue-input"
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder="Venue Name"
            />
          </div>
          <div className="venue-add-button">
            <button className="btn-lg-primary" onClick={addVenue}>
              Add Venue
            </button>
          </div>
          <div className="filler"></div>
        </div>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}
