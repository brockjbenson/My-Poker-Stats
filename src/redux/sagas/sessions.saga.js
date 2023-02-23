import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSessions() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/sessions/stats", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_SESSIONS", payload: response.data });
    // console.log("all sessions:", response.data);
  } catch (error) {
    console.log("all sessions get request failed", error);
  }
}

function* fetchSpecificSessions(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/sessions/specific/${Number(action.payload)}`,
      config
    );

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_SPECIFIC_SESSION", payload: response.data });
    // console.log("specific session is:", response.data);
  } catch (error) {
    console.log("all sessions get request failed", error);
  }
}

function* addSession(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post(`/api/sessions/`, action.payload, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "FETCH_SESSIONS" });
    console.log("adding session");
  } catch (error) {
    console.log("adding session post request failed", error);
  }
}

function* deleteSession(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(`/api/sessions/${action.payload}`, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "FETCH_SESSIONS" });
    // console.log("all venues stats:", response.data);
  } catch (error) {
    console.log("deleting venue request failed", error);
  }
}

function* editSession(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    let editObj = {
      buy_in: action.payload.buy_in,
      cash_out: action.payload.cash_out,
      hours_played: action.payload.hours_played,
      session_date: action.payload.session_date,
      stakes: action.payload.stakes,
      notes: action.payload.notes,
    };
    yield axios.put(`/api/sessions/${action.payload.id}`, editObj, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "FETCH_SPECIFIC_SESSION", payload: action.payload.id });
    // console.log("all venues stats:", response.data);
  } catch (error) {
    console.log("deleting venue request failed", error);
  }
}

function* sessionsSaga() {
  yield takeLatest("FETCH_SESSIONS", fetchSessions);
  yield takeLatest("FETCH_SPECIFIC_SESSION", fetchSpecificSessions);
  yield takeLatest("ADD_SESSION", addSession);
  yield takeLatest("EDIT_SESSION", editSession);
  yield takeLatest("DELETE_SESSION", deleteSession);
}

export default sessionsSaga;
