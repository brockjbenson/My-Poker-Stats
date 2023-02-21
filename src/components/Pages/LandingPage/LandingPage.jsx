import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  function sendRegister() {
    history.push("/registration");
  }

  return (
    <div className="main">
      <div className="container">
        <h2>Welcome to</h2>
        <h1>MyPokerStats</h1>
      </div>
      <button className="btn btn_sizeSm" onClick={sendRegister}>
        Get Started
      </button>
      <button className="btn btn_sizeSm" onClick={onLogin}>
        Log In
      </button>
    </div>
  );
}

export default LandingPage;
