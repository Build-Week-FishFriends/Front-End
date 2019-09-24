import React from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import { Switch, Route } from 'react-router-dom';
import Map from './components/map/Map';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' render={props => <Map {...props} />} />
        <Route path='/login' render={props => <LoginForm {...props} />} />
        <Route exact path='/signup' render={props => <SignupForm {...props} />} />
      </Switch>
    </>
  );
}

export default App;
