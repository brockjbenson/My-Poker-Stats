import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { number } from "prop-types";

function DashBoardPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [sessionID, setSessionId] = useState("");
  const [venueID, setVenueID] = useState("");
  const [wins] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const allStats = useSelector((store) => store.allStatsReducer);
  const sessions = useSelector((store) => store.sessionsReducer);
  // console.log(sessions);
  console.log(allStats);

  // function getSpecific() {
  //   dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: Number(sessionID) });
  //   setSessionId("");
  // }

  // function getSpecificVenue() {
  //   dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: Number(venueID) });
  //   setVenueID("");
  // }

  sessions.allSessionsReducer.map((session, index) => {
    if (session.net_profit >= 0) {
      wins.push(session);
    }
  });
  console.log("win %:", wins.length / sessions.allSessionsReducer.length);

  return (
    <div className="container">
      <div className="heading">
        <h1>Dashboard</h1>
      </div>
      {allStats.map((stat, index) => {
        // console.log(Number(stat.total_sessions));
        return (
          <div key={index} className="stats-container">
            <div className="stat">
              <p>Total Net Profit</p>
              <h2>${stat.total_net}</h2>
            </div>
            <div className="stat">
              <p>Sessions Played</p>
              <h2>{stat.total_sessions}</h2>
            </div>
            <div className="stat">
              <p>Hours Played</p>
              <h2>{stat.total_hours}</h2>
            </div>
            <div className="stat">
              <p>Win%</p>
              <h2>
                {(wins.length / sessions.allSessionsReducer.length) * 100}%
              </h2>
            </div>
            <div className="stat">
              {" "}
              <p>Session Avg</p>
              <h2>${stat.avg_session_net}</h2>
            </div>
            <div className="stat">
              {" "}
              <p>Hourly Profit</p>
              <h2>{stat.hourly_total}</h2>
            </div>
          </div>
        );
      })}

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default DashBoardPage;
