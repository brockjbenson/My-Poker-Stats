import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { number } from "prop-types";
import { useEffect } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

export default function SpecificVenueViewPage() {
  useEffect(() => {
    dispatch({ type: "FETCH_VENUES" });
  }, []);
  const dispatch = useDispatch();
  const history = useHistory();
  const venue = useSelector(
    (store) => store.venuesReducer.getSpecificVenueReducer
  );
  console.log(venue);
  return <></>;
}
