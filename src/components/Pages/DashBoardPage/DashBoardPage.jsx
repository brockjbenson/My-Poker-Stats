import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Nav from "../../Shared/Nav/Nav";
import "../SpecificVenuePage/SpecificVenuePage.css";
import "../DashBoardPage/DashBoardPage.css";
import DashBoardStats from "./DashBoardStats";

function DashBoardPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const history = useHistory();
  const [sessionID, setSessionId] = useState("");
  const [venueID, setVenueID] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const allStats = useSelector((store) => store.allStatsReducer);
  const sessions = useSelector((store) => store.sessionsReducer);
  const sessionCard = useSelector(
    (store) => store.sessionsReducer.allSessionsReducer
  );
  console.log();
  const venueStats = useSelector(
    (store) => store.venuesReducer.getVenuesStatsReducer
  );
  console.log("venue:", venueStats[0]);
  console.log("session:", sessionCard[0]);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_STATS" });
    dispatch({ type: "FETCH_SESSIONS" });
    dispatch({ type: "FETCH_VENUES" });
    dispatch({ type: "FETCH_VENUES_STATS" });
  }, []);

  const sendToVenues = () => {
    history.push(`/venue-list`);
  };

  const sendToVenue = (venid) => {
    history.push(`/venue-view/${venid}`);
  };

  const sendToSession = (seshid, venid) => {
    history.push(`/session-view/${seshid}/${venid}`);
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <h1 className="clr-light">Dashboard</h1>
          <div className="buttons-container"></div>
        </div>
        <div className="stats-container">
          <DashBoardStats />
        </div>

        <div className="card-container">
          {allStats[0] !== undefined ? (
            <div className="card-section-1a">
              <p>Recent</p>
              <p onClick={sendToVenues}>See All</p>
            </div>
          ) : (
            <div className="card-section-1b">
              <button className="accent-btn-light" onClick={sendToVenues}>
                Add Venue
              </button>
            </div>
          )}
          <div className="card-section-2">
            {venueStats[0] !== undefined ? (
              <div
                key={venueStats[0].venue_id}
                onClick={() => sendToVenue(venueStats[0].venue_id)}
                className="venue-card"
              >
                <h2>{venueStats[0].venue_name}</h2>
                <div className="venue-stats">
                  <div className="venue-stat">
                    <p>Net Profit</p>
                    <NumericFormat
                      className="h2"
                      value={venueStats[0].venue_net}
                      prefix={"$"}
                      thousandSeparator=","
                      allowNegative
                      decimalScale={2}
                    />
                  </div>
                  <div className="venue-stat">
                    <p>Hourly Net</p>
                    <NumericFormat
                      className="h2"
                      value={venueStats[0].venue_hourly}
                      prefix={"$"}
                      thousandSeparator=","
                      allowNegative
                      decimalScale={2}
                    />
                  </div>
                  <div className="venue-stat">
                    <p>Total Hours</p>
                    <h2>{venueStats[0].total_hours}</h2>
                  </div>
                  <div className="venue-stat">
                    <p>Sessions</p>
                    <h2>{venueStats[0].sessions_played}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-stats-container clr-light">
                <div className="no-stats-header">
                  <h1>Welcome, {user.username}!</h1>
                </div>
                <div className="no-stats-body">
                  <h2 className="font-wt-regular">
                    To get started with MyPokerStats, click the "Add Venue"
                    button above and create a new venue!
                  </h2>
                </div>
              </div>
            )}
            {sessionCard[0] !== undefined && (
              <div
                onClick={() =>
                  sendToSession(sessionCard[0].id, sessionCard[0].venue_id)
                }
                className="session-card clr-primary"
              >
                <div className="session-header">
                  <div className="venue-name">
                    <p className="font-wt-bold">
                      {sessionCard[0].venue} on:{" "}
                      {format(
                        new Date(sessionCard[0].session_date),
                        "dd/MM/yy"
                      )}
                    </p>
                  </div>
                </div>
                <div className="session-stats">
                  <div className="session-stat">
                    <p>Net Profit:</p>
                    <NumericFormat
                      className="p"
                      value={sessionCard[0].net_profit}
                      prefix={"$"}
                      thousandSeparator=","
                      allowNegative
                      decimalScale={2}
                    />
                  </div>
                  <div className="session-stat">
                    <p>Stakes:</p>
                    <h2>{sessionCard[0].stakes}</h2>
                  </div>
                  <div className="session-stat">
                    <p>Hourly Net:</p>
                    <NumericFormat
                      className="p"
                      value={sessionCard[0].hourly}
                      prefix={"$"}
                      thousandSeparator=","
                      allowNegative
                      decimalScale={2}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="nav">
        <Nav />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default DashBoardPage;
