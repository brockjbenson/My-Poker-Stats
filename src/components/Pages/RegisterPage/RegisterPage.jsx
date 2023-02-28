import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
  return (
    <div className="body">
      <div className="main">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
