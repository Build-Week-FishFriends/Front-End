import React, { useState, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import axios from 'axios';

const Lakes = () => {
  const [lakes, setLakes] = useState([]);
  useEffect(() => {
    console.log('USE EFFECT');
    axios
      .get(`https://fish-friends.herokuapp.com/waterBodies`)
      .then(res => {
        console.log(res.data);
        setLakes(lakes => [...lakes, ...res.data]);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  }, []);
  return lakes.map((lake, id) => {
    return (
      <Marker key={id} latitude={lake.latitude} longitude={lake.longitude}>
        <a href='#'>{lake.facilityName}</a>
      </Marker>
    );
  });
};
export default Lakes;
