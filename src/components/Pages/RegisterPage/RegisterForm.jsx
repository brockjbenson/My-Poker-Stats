import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div className="form-container">
      <h1 className="clr-light">Register</h1>
      <form className="login-reg-form" onSubmit={registerUser}>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className="log-reg-inputs-container">
          <input
            type="text"
            className="log-reg-input"
            placeholder="Username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            className="log-reg-input"
            placeholder="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="log-reg-btn-container">
          <button className="btn-lg-primary" type="submit">
            Register
          </button>
        </div>
      </form>
      <div className="new-user-container">
        <p className="register-redirect">
          Have an account?{" "}
          <span
            className="register-text hover"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
