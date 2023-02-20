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
    console.log(response.data);
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
    console.log(response.data);
  } catch (error) {
    console.log("all sessions get request failed", error);
  }
}

function* sessionsSaga() {
  yield takeLatest("FETCH_SESSIONS", fetchSessions);
  yield takeLatest("FETCH_SPECIFIC_SESSION", fetchSpecificSessions);
}

export default sessionsSaga;
