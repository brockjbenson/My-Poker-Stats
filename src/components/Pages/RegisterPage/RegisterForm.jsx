import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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
  );
}

export default RegisterForm;
