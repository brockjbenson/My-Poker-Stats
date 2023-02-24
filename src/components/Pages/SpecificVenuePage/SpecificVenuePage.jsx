import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../../Shared/Nav/Nav";
export default function SpecificVenueViewPage() {
  const [venName, setVenName] = useState("");
  const [venId, setVenID] = useState(0);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: id });
    dispatch({ type: "FETCH_SPECIFIC_VENUE_STATS", payload: id });
    dispatch({ type: "FETCH_VENUES_SESSIONS", payload: id });
    dispatch({ type: "FETCH_SESSIONS" });
  }, []);
  const { id } = useParams();
  const wins = [];
  const [winPercentage, setWinPercentage] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const venue = useSelector(
    (store) => store.venuesReducer.getSpecificVenueStatsReducer
  );
  const venueName = useSelector(
    (store) => store.venuesReducer.getSpecificVenueReducer
  );
  console.log("venue is:", venueName);
  const sessions = useSelector(
    (store) => store.venuesReducer.getVenuesSessionsReducer
  );

  useEffect(() => {
    {
      venueName[0] !== undefined && setVenName(venueName[0].name);
      venueName[0] !== undefined && setVenID(venueName[0].ven_id);
    }
  }, [venueName]);
  console.log("ven id", venId);

  function getSession(id) {
    // dispatch({ type: "FETCH_SPECIFIC_SESSION", payload: id });
    // dispatch({ type: "FETCH_SPECIFIC_VENUE_STATS", payload: venId });
    history.push(`/session-view/${id}/${venId}`);
    console.log(id, venId);
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

  function confirmSessionDelete(sID) {
    let r = confirm("Are You Sure? You will delete all data for this session!");
    if (r == true) {
      deleteSessionBtn(sID);
    } else {
    }
  }

  function confirmVenueDelete() {
    let r = confirm(
      "Are you sure? All sessions and data connected to this venue will be deleted."
    );
    if (r == true) {
      deleteVenue();
    } else {
    }
  }

  function deleteVenue() {
    dispatch({ type: "DELETE_VENUE", payload: venId });
    history.push("/venue-list");
  }

  function deleteSessionBtn(sID) {
    dispatch({ type: "DELETE_SESSION", payload: Number(sID) });
    dispatch({ type: "FETCH_VENUES_SESSIONS", payload: id });
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: id });
    history.push(`/venue-view/${venId}`);
    // console.log(sID);
  }

  function addNewSession() {
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: id });
    dispatch({ type: "FETCH_VENUES_SESSIONS", payload: id });
    // console.log(venId);
    history.push(`/add-session/${id}`);
  }

  function saveEdit() {
    dispatch({
      type: "EDIT_VENUE",
      payload: { id: Number(venId), name: String(venName) },
    });
    setEditMode(false);
  }

  console.log("sessions: ", sessions);
  console.log("venue: ", venue);

  return (
    <div className="body-container">
      <div className="main-container">
        <div className="venue-view-container">
          <>
            <div className="heading clr-light">
              <div className="venue-heading-cont-1"></div>
              <div className="venue-heading-cont-2">
                {editMode ? (
                  <>
                    <div className="venue-heading-header">
                      <input
                        value={venName}
                        onChange={(e) => setVenName(e.target.value)}
                      />
                    </div>
                    <div className="edit-btns-container">
                      <button className="accent-btn" onClick={saveEdit}>
                        Save
                      </button>
                      <button
                        className="accent-btn"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="venue-heading-header">
                      <h1>{venName}</h1>
                    </div>
                    <div className="edit-btns-container">
                      <button
                        className="accent-btn"
                        onClick={confirmVenueDelete}
                      >
                        Delete
                      </button>
                      <button
                        className="accent-btn"
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="venue-heading-cont-3"></div>
            </div>
            <div className="stats-container clr-light">
              <div className="stat">
                <p>Total Net Profit</p>
                {venue[0] !== undefined ? (
                  <h2>${venue[0].venue_net}</h2>
                ) : (
                  <h2>-</h2>
                )}
              </div>
              <div className="stat">
                <p>Total Sessions</p>
                {venue[0] !== undefined ? (
                  <h2>{venue[0].sessions_played}</h2>
                ) : (
                  <h2>-</h2>
                )}
              </div>
              <div className="stat">
                <p>Total Hours</p>
                {venue[0] !== undefined ? (
                  <h2>{venue[0].total_hours}</h2>
                ) : (
                  <h2>-</h2>
                )}
              </div>
              <div className="stat">
                <p>Win Rate</p>
                {venue[0] !== undefined ? (
                  <h2>{winPercentage}%</h2>
                ) : (
                  <h2>-</h2>
                )}
              </div>
              <div className="stat">
                <p>Session Avg</p>
                {venue[0] !== undefined ? (
                  <h2>${venue[0].avg_session_net}</h2>
                ) : (
                  <h2>-</h2>
                )}
              </div>
              <div className="stat">
                <p>Avg Hourly</p>
                {venue[0] !== undefined ? (
                  <h2>${venue[0].venue_hourly}</h2>
                ) : (
                  <h2>-</h2>
                )}
              </div>
            </div>
            <div className="venue-view-card-container bg">
              <div className="addnew-btn">
                <button className="accent-btn" onClick={addNewSession}>
                  Add Session
                </button>
              </div>
              <div className="sessions-list clr-primary">
                {venue[0] !== undefined ? (
                  <>
                    {sessions.map((sesh, index) => {
                      console.log(sesh.id);
                      return (
                        <div
                          key={index}
                          onClick={() => getSession(sesh.id)}
                          className="session-card"
                        >
                          <div className="session-header-ven list-card-header">
                            <div className="date">
                              <p>Date: </p>
                              <h2>
                                {format(
                                  new Date(sesh.session_date),
                                  "dd/MM/yy"
                                )}
                              </h2>
                            </div>
                            <div className="delete-btn clr-primary ">
                              <p
                                className="font-wt-bold"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmSessionDelete(sesh.id);
                                }}
                              >
                                Delete
                              </p>
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
                  </>
                ) : (
                  <div className="no-stats-container clr-light">
                    <div className="no-stats-header">
                      <h2 className="clr-neutral">No sessions to show</h2>
                    </div>
                    <div className="no-stats-body">
                      <h2 className="font-wt-regular">
                        Here is where your list of sessions for this venue will
                        be. Click the "Add Session" button to create a new
                        session for this venue!
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}
