import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";

function Nav() {
  const dispatch = useDispatch();

  return (
    <div className="nav">
      <div className="nav-item">
        <Link to="/home">
          <p className="nav-title font-md  font-wt-bold">Home</p>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/venue-list">
          <p className="font-wt-bold font-md">Venues</p>
        </Link>
      </div>
      <div className="nav-item">
        <p
          className="log-out font-wt-bold font-md"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Log Out
        </p>
      </div>
    </div>
  );
}

export default Nav;
