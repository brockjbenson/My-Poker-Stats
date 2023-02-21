import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SpecificVenueViewPage() {
  const { id } = useParams();
  useEffect(() => {
    dispatch({ type: "FETCH_VENUES" });
    dispatch({ type: "FETCH_SPECIFIC_VENUE", payload: id });
    dispatch({ type: "FETCH_VENUES_SESSIONS", payload: id });
  }, []);
  const dispatch = useDispatch();
  const history = useHistory();
  const venue = useSelector(
    (store) => store.venuesReducer.getSpecificVenueReducer
  );
  const sessions = useSelector(
    (store) => store.venuesReducer.getVenuesSessionsReducer
  );
  console.log(sessions);
  console.log(venue);
  return <></>;
}
