import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchVenue() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/venues/", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_VENUES", payload: response.data });
    // console.log("all venues:", response.data);
  } catch (error) {
    console.log("all sessions get request failed", error);
  }
}

function* fetchVenueStats() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/venues/stats", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_VENUES_STATS", payload: response.data });
    // console.log("all venues stats:", response.data);
  } catch (error) {
    console.log("all sessions get request failed", error);
  }
}

function* deleteVenue(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(`/api/venues/${action.payload}`, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "FETCH_VENUES" });
    // console.log("all venues stats:", response.data);
  } catch (error) {
    console.log("deleting venue request failed", error);
  }
}

function* editVenue(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log(action.payload.id, action.payload.name);
    yield axios.put(
      `/api/venues/${action.payload.id}`,
      { name: action.payload.name },
      config
    );

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "FETCH_VENUES" });
    // console.log("all venues stats:", response.data);
  } catch (error) {
    console.log("editing venue request failed", error);
  }
}

function* fetchSpecificVenue(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/venues/specific/${Number(action.payload)}`,
      config
    );

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_SPECIFIC_VENUE", payload: response.data });
    // console.log("specific venue is:", response.data);
  } catch (error) {
    console.log("all sessions get request failed", error);
  }
}

function* fetchSpecificVenueSessions(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/venues/venue-sessions/${Number(action.payload)}`,
      config
    );

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_SPECIFIC_VENUE_SESSIONS", payload: response.data });
    // console.log("specific venue is:", response.data);
  } catch (error) {
    console.log("all sessions get request failed", error);
  }
}

function* addVenue(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post(`/api/venues/`, action.payload, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "FETCH_VENUES" });
    console.log("adding venue");
  } catch (error) {
    console.log("adding venue post request failed", error);
  }
}

function* venuesSaga() {
  yield takeLatest("FETCH_VENUES", fetchVenue);
  yield takeLatest("FETCH_VENUES_STATS", fetchVenueStats);
  yield takeLatest("FETCH_SPECIFIC_VENUE", fetchSpecificVenue);
  yield takeLatest("ADD_VENUE", addVenue);
  yield takeLatest("DELETE_VENUE", deleteVenue);
  yield takeLatest("EDIT_VENUE", editVenue);
  yield takeLatest("FETCH_VENUES_SESSIONS", fetchSpecificVenueSessions);
}

export default venuesSaga;
