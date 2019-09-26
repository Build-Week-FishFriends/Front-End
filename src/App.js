import React, { useState, useEffect } from "react";
import LoginForm from "./components/auth/Login";
import SignupForm from "./components/auth/Signup";
import { Switch, Route } from "react-router-dom";
import LakesCard from "./components/LakesCard";
import Map from "./components/map/Map";
import UserProfile from "./components/user/userProfile";
import PrivateRoute from "./privateRoute";
import NavBar from "./components/layout/navBar";
import axios from "axios";
import LogForm from "./components/logs/LogForm";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("user"))
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const [lakes, setLakes] = useState([]);
  useEffect(() => {
    console.log("App.js use effect");
    axios
      .get(`https://fish-friends.herokuapp.com/waterBodies`)
      .then(res => {
        setLakes(lakes => [...lakes, ...res.data]);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  }, []);

  const handleUserObject = user => setUser(user);

  return (
    <>
      <NavBar user={user} />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <div>Welcome to Fish Friends!</div>}
        />
        <Route path="/map" render={props => <Map {...props} lakes={lakes} />} />
        <Route
          path="/login"
          render={props => (
            <LoginForm {...props} handleUserObject={handleUserObject} />
          )}
        />
        <Route
          path="/signup"
          render={props => (
            <SignupForm {...props} handleUserObject={handleUserObject} />
          )}
        />
        <Route path="/logsform/:id" render={props => <LogForm {...props} />} />
        <PrivateRoute path="/:username" component={UserProfile} />
      </Switch>
    </>
  );
}

export default App;
