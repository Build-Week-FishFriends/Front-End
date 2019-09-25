import React, { useState, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LakesCard from '../LakesCard';
import { Route } from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import PrivateRoute from '../../privateRoute';

const Lakes = ({ zoom, handleLakes }) => {
  const [lakes, setLakes] = useState([]);

  useEffect(() => {
    console.log('use effect');
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

  if (zoom > 12) {
    console.log('render marker details');
  } else {
    console.log('hide marker details');
  }
  return (
    <div>
      {lakes.map((lake, id) => {
        return (
          <Marker key={lake.id} latitude={lake.latitude} longitude={lake.longitude}>
            <Modal
              trigger={
                <Link className='ui button' to={`/map/${lake.id}`}>
                  {lake.facilityName}
                </Link>
              }
            />
          </Marker>
        );
      })}
      <PrivateRoute path='/map/:id' component={LakesCard} />
    </div>
  );
};
export default Lakes;
