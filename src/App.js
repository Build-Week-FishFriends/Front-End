import React, { useState, useEffect } from 'react';
import LoginForm from './components/auth/Login';
import SignupForm from './components/auth/Signup';
import { Switch, Route } from 'react-router-dom';
import Map from './components/map/Map';
import UserProfile from './components/user/userProfile';
import PrivateRoute from './privateRoute';
import NavBar from './components/layout/navBar';

function App() {
  const [user, setUser] = useState({});
  const handleUserObject = user => setUser(user);
  useEffect(() => {
    if (localStorage.getItem('user')) setUser(JSON.parse(localStorage.getItem('user')));
  }, []);
  return (
    <>
      <NavBar user={user} />
      <Switch>
        <Route exact path='/' component={Map} />
        <Route path='/login' render={props => <LoginForm {...props} handleUserObject={handleUserObject} />} />
        <Route path='/signup' render={props => <SignupForm {...props} handleUserObject={handleUserObject} />} />
        <PrivateRoute path='/:username' component={UserProfile} />
      </Switch>
    </>
  );
}

export default App;
