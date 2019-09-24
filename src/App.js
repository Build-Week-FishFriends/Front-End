import React, { useState } from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import { Switch, Route } from 'react-router-dom';
import Map from './components/map/Map';
import UserProfile from './components/user/userProfile';
import PrivateRoute from './privateRoute';
import NavBar from './components/layout/navBar';

function App() {
  const [user, setUser] = useState({
    isLoggedIn: true,
    userName: 'losephjambert',
  });
  return (
    <>
      <NavBar user={user} />
      <Switch>
        <Route exact path='/' component={Map} />
        <Route path='/login' render={props => <LoginForm {...props} />} />
        <Route path='/signup' render={props => <SignupForm {...props} />} />
        <PrivateRoute path='/:username' component={UserProfile} />
      </Switch>
    </>
  );
}

export default App;
