import React, { useState, useEffect } from 'react';
import LoginForm from './components/auth/Login';
import SignupForm from './components/auth/Signup';
import { Switch, Route } from 'react-router-dom';
import Map from './components/map/Map';
import UserProfile from './components/user/userProfile';
import PrivateRoute from './privateRoute';
import NavBar from './components/layout/navBar';
import axios from 'axios';
import HomePage from './components/layout/homePage';
import LogForm from './components/logs/LogForm';

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('user')) setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const [lakes, setLakes] = useState([]);
  useEffect(() => {
    console.log('App.js use effect');
    axios
      .get(`https://fish-friends.herokuapp.com/waterBodies`)
      .then(res => {
        setLakes(lakes => [...lakes, ...res.data]);
        setIsLoading(isLoading => !isLoading);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  }, []);

  const handleUserObject = user => setUser(user);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <NavBar user={user} logout={logout} isLoading={isLoading} />
      <Switch>
        <Route exact path='/' render={props => <HomePage {...props} user={user} isLoading={isLoading} />} />
        <PrivateRoute path='/map' component={Map} lakes={lakes} />
        <Route path='/login' render={props => <LoginForm {...props} handleUserObject={handleUserObject} />} />
        <Route path='/signup' render={props => <SignupForm {...props} handleUserObject={handleUserObject} />} />
        <PrivateRoute path='/logsform/:id' component={LogForm} />
        <PrivateRoute path='/:username' component={UserProfile} user={user} />
      </Switch>
    </>
  );
}

export default App;
