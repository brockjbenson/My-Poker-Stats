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

function DashBoardPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const history = useHistory();
  const [sessionID, setSessionId] = useState("");
  const [venueID, setVenueID] = useState("");
  const wins = [];
  const [winPercentage, setWinPercentage] = useState(0);
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

  useEffect(() => {
    sessions.allSessionsReducer.map((session, index) => {
      if (session.net_profit >= 0) {
        wins.push(session);
      }
    });

    console.log(
      "wins:",
      wins.length,
      ";",
      "sessions played:",
      sessions.allSessionsReducer.length,
      ";"
    );
    const workingWinPercent = Math.round(
      (wins.length / sessions.allSessionsReducer.length) * 100
    );
    setWinPercentage(isNaN(workingWinPercent) ? 0 : workingWinPercent);
  }, [sessions.allSessionsReducer]);

  // console.log("win %:", wins.length / sessions.allSessionsReducer.length);
  // console.log(wins);

  return (
    <div className="body">
      <div className="main">
        <div className="header">
          <div className="heading">
            <h1 className="clr-light">Dashboard</h1>
          </div>
          <div className="buttons-container"></div>
        </div>

        <div className="stats-container">
          <div className="stat">
            <p>Total Net Profit</p>
            {allStats[0] !== undefined ? (
              <NumericFormat
                className="h2"
                value={allStats[0].total_net}
                prefix={"$"}
                thousandSeparator=","
                allowNegative
                decimalScale={2}
              />
            ) : (
              <h2>-</h2>
            )}
          </div>
          <div className="stat">
            <p>Total Sessions</p>
            {allStats[0] !== undefined ? (
              <h2>{allStats[0].total_sessions}</h2>
            ) : (
              <h2>-</h2>
            )}
          </div>
          <div className="stat">
            <p>Total Hours</p>
            {allStats[0] !== undefined ? (
              <h2>{allStats[0].total_hours}</h2>
            ) : (
              <h2>-</h2>
            )}
          </div>
          <div className="stat">
            <p>Win Rate</p>
            {allStats[0] !== undefined ? <h2>{winPercentage}%</h2> : <h2>-</h2>}
          </div>
          <div className="stat">
            <p>Session Avg</p>
            {allStats[0] !== undefined ? (
              <NumericFormat
                className="h2"
                value={allStats[0].avg_session_net}
                prefix={"$"}
                thousandSeparator=","
                allowNegative
                decimalScale={2}
              />
            ) : (
              <h2>-</h2>
            )}
          </div>
          <div className="stat">
            <p>Avg Hourly</p>
            {allStats[0] !== undefined ? (
              <NumericFormat
                className="h2"
                value={allStats[0].hourly_total}
                prefix={"$"}
                thousandSeparator=","
                allowNegative
                decimalScale={2}
              />
            ) : (
              <h2>-</h2>
            )}
          </div>
        </div>

        <div className="card-container bg">
          {allStats[0] !== undefined ? (
            <div className="recent-venue">
              <div className="recent">
                <p className="clr-light font-wt-bold">Recent</p>
              </div>
              <div className="recent">
                <p className="clr-light font-wt-bold" onClick={sendToVenues}>
                  See All
                </p>
              </div>
            </div>
          ) : (
            <div className="add-venue-container">
              <button className="accent-btn" onClick={sendToVenues}>
                Add Venue
              </button>
            </div>
          )}
          {venueStats[0] !== undefined ? (
            <div
              key={venueStats[0].venue_id}
              onClick={() => sendToVenue(venueStats[0].venue_id)}
              className="venue-card clr-light"
            >
              <div className="venue-header">
                <h2>{venueStats[0].venue_name}</h2>
              </div>
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
                  To get started with MyPokerStats, click the "Add Venue" button
                  above and create a new venue!
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
                    {format(new Date(sessionCard[0].session_date), "dd/MM/yy")}
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
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default DashBoardPage;
