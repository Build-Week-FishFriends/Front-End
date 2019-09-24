import React from 'react';
import LoginForm from './components/auth/Login';
import SignupForm from './components/auth/Signup';
import { Switch, Route } from 'react-router-dom';
import Map from './components/map/Map';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' render={props => <Map {...props} />} />
        <Route path='/login' render={props => <LoginForm {...props} />} />
        <Route path='/signup' render={props => <SignupForm {...props} />} />
      </Switch>
    </>
  );
}

export default App;
