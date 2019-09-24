import React, { useState, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LakesCard from '../LakesCard';
import { Route } from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const Lakes = ({ zoom }) => {
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
          <div>
            <Marker key={lake.id} latitude={lake.latitude} longitude={lake.longitude}>
              <Modal
                trigger={
                  <Link class='ui button' to={`/lakes/${lake.id}`}>
                    {lake.facilityName}
                  </Link>
                }
              />
            </Marker>
          </div>
        );
      })}
      <Route
        path='/lakes/:id'
        render={props => {
          return <LakesCard {...props} lake={lakes} />;
        }}
      />
    </div>
  );
};
export default Lakes;
