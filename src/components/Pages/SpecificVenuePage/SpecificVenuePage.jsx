import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../../Shared/Nav/Nav";
export default function SpecificVenueViewPage() {
  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: id });
    dispatch({ type: "FETCH_VENUES_SESSIONS", payload: id });
  }, []);
  const { id } = useParams();
  //const [wins, setWins] = useState([]);
  const wins = [];
  const [winPercentage, setWinPercentage] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const venue = useSelector(
    (store) => store.venuesReducer.getSpecificVenueReducer
  );
  const sessions = useSelector(
    (store) => store.venuesReducer.getVenuesSessionsReducer
  );

  function getSession(id) {
    dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: id });
    history.push(`/session-view/${id}`);
  }
  useEffect(() => {
    sessions.map((session, index) => {
      if (Number(session.net_profit) >= 0) {
        wins.push(session);
      }
    });
    const workingWinPercent = Math.round((wins.length / sessions.length) * 100);
    setWinPercentage(isNaN(workingWinPercent) ? 0 : workingWinPercent);
  }, [sessions]);

  console.log("sessions: ", sessions);
  console.log("venue: ", venue);

  return (
    <div className="body-container">
      <div className="main-container">
        <div className="venue-view-container">
          {venue[0] !== undefined && (
            <>
              <div className="heading">
                <h1>{venue[0].venue_name}</h1>
              </div>
              <div className="stats-container">
                <div className="stat">
                  <p>Total Net Profit</p>
                  <h2>${venue[0].venue_net}</h2>
                </div>
                <div className="stat">
                  <p>Total Sessions</p>
                  <h2>{venue[0].sessions_played}</h2>
                </div>
                <div className="stat">
                  <p>Total Hours</p>
                  <h2>{venue[0].total_hours}</h2>
                </div>
                <div className="stat">
                  <p>Win Rate</p>
                  <h2>{winPercentage}%</h2>
                </div>
                <div className="stat">
                  <p>Session Avg</p>
                  <h2>${venue[0].avg_session_net}</h2>
                </div>
                <div className="stat">
                  <p>Avg Hourly</p>
                  <h2>${venue[0].venue_hourly}</h2>
                </div>
              </div>
              <div className="card-container">
                <div className="addnew-btn">
                  <button>Add New</button>
                </div>
                {sessions.map((sesh, index) => {
                  console.log(sesh.id);
                  return (
                    <div
                      key={index}
                      onClick={() => getSession(sesh.id)}
                      className="session-card"
                    >
                      <div className="session-header list-card-header">
                        <div className="date">
                          <p>Date: </p>
                          <h2>
                            {format(new Date(sesh.session_date), "dd/MM/yy")}
                          </h2>
                        </div>
                        <div className="stakes">
                          <p>Stakes: </p>
                          <h2> {sesh.stakes}</h2>
                        </div>
                      </div>
                      <div className="session-stats">
                        <div className="session-stat">
                          <p>Net Profit:</p>
                          <h2>{sesh.net_profit}</h2>
                        </div>
                        <div className="session-stat">
                          <p>Stakes:</p>
                          <h2>{sesh.stakes}</h2>
                        </div>
                        <div className="session-stat">
                          <p>Hourly Net:</p>
                          <h2>{sesh.hourly}</h2>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}
