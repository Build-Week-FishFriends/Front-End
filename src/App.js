import React, { useState, useEffect } from 'react';
import LoginForm from './components/auth/Login';
import SignupForm from './components/auth/Signup';
import { Switch, Route } from 'react-router-dom';
import LakesCard from './components/LakesCard';
import Map from './components/map/Map';
import UserProfile from './components/user/userProfile';
import PrivateRoute from './privateRoute';
import NavBar from './components/layout/navBar';

import { Button, Header, Image, Modal } from 'semantic-ui-react';

function App() {
  const [user, setUser] = useState({});
  const [lakes, setLakes] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('user')) setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleUserObject = user => setUser(user);
  const handleLakes = lakes => setLakes(prevLakes => [...prevLakes, ...lakes]);

  return (
    <>
      <NavBar user={user} />
      <Switch>
        <Route exact path='/' component={Map} handleLakes={handleLakes} />
        <Route path='/login' render={props => <LoginForm {...props} handleUserObject={handleUserObject} />} />
        <Route path='/signup' render={props => <SignupForm {...props} handleUserObject={handleUserObject} />} />
        <PrivateRoute path='/lakes/:id' component={LakesCard} />
        <PrivateRoute path='/:username' component={UserProfile} />
      </Switch>
    </>
  );
}

export default App;
