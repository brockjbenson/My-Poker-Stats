import React from "react";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="body">
      <div className="main">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
