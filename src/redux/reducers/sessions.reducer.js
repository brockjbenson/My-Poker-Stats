import { combineReducers } from "redux";

const allSessionsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SESSIONS":
      return action.payload;
    default:
      return state;
  }
};

const getSpecificSessionReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SPECIFIC_SESSION":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
export default combineReducers({
  allSessionsReducer,
  getSpecificSessionReducer,
});
