import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAllStats() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/all/stats/", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_ALL_STATS", payload: response.data });
    console.log(response.data);
  } catch (error) {
    console.log("all stats get request failed", error);
  }
}

function* allStatsSaga() {
  yield takeLatest("FETCH_ALL_STATS", fetchAllStats);
}

export default allStatsSaga;
