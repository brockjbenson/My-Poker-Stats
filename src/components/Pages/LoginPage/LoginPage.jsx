import React from "react";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const history = useHistory();

  return (
    <div className="body">
      <div className="main">
        <div className="header">
          <div className="heading">
            <h1 className="clr-light">Welcome Back</h1>
          </div>
        </div>
        <LoginForm />
        <div className="new-user-container">
          <p className="register-redirect">
            Need an account?{" "}
            <span
              className="register-text"
              onClick={() => {
                history.push("/registration");
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
