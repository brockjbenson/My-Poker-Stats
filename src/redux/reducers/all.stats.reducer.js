const allStatsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_STATS":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:

export default allStatsReducer;
