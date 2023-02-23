import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";

function Nav() {
  const dispatch = useDispatch();

  return (
    <div className="nav">
      <Link to="/home">
        <p className="nav-title font-wt-bold">Dashboard</p>
      </Link>
      <Link to="/venue-list">
        <p className="font-wt-bold">Venues</p>
      </Link>

      <p
        className="log-out font-wt-bold"
        onClick={() => dispatch({ type: "LOGOUT" })}
      >
        Log Out
      </p>
    </div>
  );
}

export default Nav;
