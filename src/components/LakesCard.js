import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Header, Image, Modal, Item } from 'semantic-ui-react'

function LakesCard(props) {
    const [nowLake, setNowLake] = useState({});
   

    const {match, lake} = props;
    const id = match.params.id;
    useEffect(() => {
      const lakeUpdate = lake.find(item => `${item.id}` === id);
      
      if (lakeUpdate) {
        setNowLake(lakeUpdate)
      }
    },[id])
  
    
    return (
      <>
        
      <Modal.Header>{nowLake.facilityName}</Modal.Header>
     
        
        <Modal.Description>
          
          <p>
           {nowLake.directions}
          </p>
          
        </Modal.Description>
     
    
      </> 
    );
  }
  
  export default LakesCard;