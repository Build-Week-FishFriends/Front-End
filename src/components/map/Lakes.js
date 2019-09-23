import React, { useState, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  return lakes.map((lake, id) => {
    return (
      <Marker key={lake.id} latitude={lake.latitude} longitude={lake.longitude}>
        <Link to={`/lakes/${lake.id}`}>{lake.facilityName}</Link>
      </Marker>
    );
  });
};
export default Lakes;
