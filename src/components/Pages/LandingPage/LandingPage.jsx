import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

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
    <div className="body">
      <div className="landing-container">
        <div className="landing-header">
          <h2 className="clr-neutral">Welcome to</h2>
          <h1 className="clr-light">MyPokerStats</h1>
        </div>
        <div className="landing-body">
          <div className="landing-section">
            <div className="landing-section-header clr-light">
              <BsGraphUp className="landing-graph-icon" />
              <h2>Custom Stats</h2>
            </div>
            <div className="landing-section-body">
              <p className="clr-neutral font-wt-bold">
                Take your poker game to the next level with in depth data
              </p>
            </div>
          </div>
          <div className="landing-section">
            <div className="landing-section-header clr-light">
              <AiOutlineEye className="landing-eye-icon" />
              <h2>Visualize</h2>
            </div>
            <div className="landing-section-body">
              <p className="clr-neutral font-wt-bold">
                See if the plays you are making at the table make or lose you
                money
              </p>
            </div>
          </div>
        </div>
        <div className="landing-buttons">
          <button className="btn-lg-primary" onClick={sendRegister}>
            Get Started
          </button>
          <button className="btn-lg-light" onClick={onLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
