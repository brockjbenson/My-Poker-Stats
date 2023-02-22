// ------- Imports ------- //

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import Nav from "../../Shared/Nav/Nav";

// ------- Component ------- //
export default function SessionViewPage() {
  // ------- UseEffect ------- //

  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: Number(id) });
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: Number(venid) });
  }, []);

  // ------- Import Vars ------- //

  const { id, venid } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // ------- Stores ------- //

  const session = useSelector(
    (store) => store.sessionsReducer.getSpecificSessionReducer
  );

  const venue = useSelector(
    (store) => store.venuesReducer.getSpecificVenueStatsReducer
  );

  // ------- Confirm Delete onClick fn------- //

  function confirmFunction(id) {
    let r = confirm("Are You Sure?");
    if (r == true) {
      deleteSessionBtn(id);
    } else {
    }
  }

  // ------- Back button fn ------- //

  function goBackToVenue() {
    history.push(`/venue-view/${venid}`);
    console.log(venid);
  }

  // ------- Delete Session fn ------- //

  function deleteSessionBtn(id) {
    dispatch({ type: "DELETE_SESSION", payload: id });
    history.push(`/venue-view/${venid}`);
  }

  // ------- Edit Session fn ------- //

  function editSession(id) {
    history.push(`/edit-session/${id}/${venid}`);
  }

  return (
    <div className="body-container">
      <div className="main-container">
        <div className="venue-view-container">
          {session[0] !== undefined && (
            <>
              <div className="heading">
                <h1>Session</h1>
                <div className="session-buttons">
                  <button onClick={goBackToVenue}>Back to Venue</button>
                  <button onClick={() => editSession(session[0].id)}>
                    Edit
                  </button>
                  <button onClick={() => confirmFunction(session[0].id)}>
                    Delete
                  </button>
                </div>
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
