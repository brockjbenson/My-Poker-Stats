import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

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
      <div className="form-container">
        <h1 className="clr-light">Log In</h1>
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
    </>
  );
}

export default LoginForm;
