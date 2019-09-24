import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LakesCard from './components/LakesCard';
import Map from './components/map/Map';

import { Button, Header, Image, Modal } from 'semantic-ui-react'

function App() {
  
  
  return (
   <>
      <Switch>
       
        <Route  path='/' render={props => <Map {...props} />} />
       
       
      </Switch>
     </>
    
  );
}

export default App;
