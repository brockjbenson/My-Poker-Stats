import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="body">
      <div className="main">
        <div className="header">
          <div className="heading">
            <h1 className="clr-light">Register</h1>
          </div>
        </div>
        <RegisterForm />
        <div className="new-user-container">
          <p className="register-redirect">
            Have an account?{" "}
            <span
              className="register-text"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
