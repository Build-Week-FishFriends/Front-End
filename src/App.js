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
      </Switch>
    </>
  );
}

export default App;
