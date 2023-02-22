import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute";

import DashBoardPage from "./Pages/DashBoardPage/DashBoardPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";

import "./App.css";
import VenueFormPage from "./Pages/VenueFormPage/VenueFormPage";
import SessionFormPage from "./Pages/SessionFormPage/SessionFormPage";
import VenueListPage from "./Pages/VenueListPage/VenueListPage";
import SpecificVenueViewPage from "./Pages/SpecificVenuePage/SpecificVenuePage";
import SessionViewPage from "./Pages/SessionViewPage/SessionViewPage";
import EditSessionPage from "./Pages/EditSessionPage/EditSessionPage";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/dashboard"
          >
            <DashBoardPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/add-venue">
            <VenueFormPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/venue-view/:id">
            <SpecificVenueViewPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/session-view/:id/:venid">
            <SessionViewPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/venue-list">
            <VenueListPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/add-session/:id">
            <SessionFormPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/edit-session/:id/:venid">
            <EditSessionPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
