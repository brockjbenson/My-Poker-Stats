import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../../Shared/Nav/Nav";
export default function SessionViewPage() {
  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: id });
  }, []);
  const { id } = useParams();
  //const [wins, setWins] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector(
    (store) => store.sessionsReducer.getSpecificSessionReducer
  );

  console.log("specific session:", session);

  return (
    <div className="body-container">
      <div className="main-container">
        <div className="venue-view-container">
          {session[0] !== undefined && (
            <>
              <div className="heading">
                <h1>Session {session[0].id}</h1>
              </div>
              <div className="stats-container">
                <div className="stat">
                  <p>Total Net Profit</p>
                  <h2>${session[0].net_profit}</h2>
                </div>
                <div className="stat">
                  <p>Date</p>
                  <h2>
                    {" "}
                    {format(new Date(session[0].session_date), "dd/MM/yy")}
                  </h2>
                </div>
                <div className="stat">
                  <p>Hours Played</p>
                  <h2>{session[0].hours_played}</h2>
                </div>
                <div className="stat">
                  <p>Buy In</p>
                  <h2>{session[0].buy_in}</h2>
                </div>
                <div className="stat">
                  <p>Stakes</p>
                  <h2>{session[0].stakes}</h2>
                </div>
                <div className="stat">
                  <p>Hourly</p>
                  <h2>{session[0].hourly}</h2>
                </div>
              </div>
            </>
          )}
          <div className="card-container">
            <div className="notes-container">
              <h2>Session Notes</h2>
              {session[0] !== undefined && (
                <>
                  <h2>{session[0].notes}</h2>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}
