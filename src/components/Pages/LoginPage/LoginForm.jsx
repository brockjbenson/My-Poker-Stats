import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <>
      <form className="login-reg-form" onSubmit={login}>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div className="log-reg-inputs-container">
          <input
            className="log-reg-input"
            placeholder="Username"
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            className="log-reg-input"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="log-reg-btn-container">
          <button className="btn-lg-primary" type="submit">
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
