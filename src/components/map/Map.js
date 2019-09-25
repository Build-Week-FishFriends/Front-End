import React, { useState, Component } from 'react';
import ReactMapGL from 'react-map-gl';
import Lakes from './Lakes';

export default function Map({ handleLakes }) {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 47.605514,
    longitude: -121.668538,
    zoom: 5,
  });

  const _onViewportChange = viewport => {
    setViewport({ ...viewport });
  };

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/mapbox/dark-v9'
      {...viewport}
      mapboxApiAccessToken={
        'pk.eyJ1IjoibG9zZXBoamFtYmVydCIsImEiOiJjazB3cG1mNnAxY2ltM21wb2JsdnUzajNsIn0.BLFLlkgEnpDe553A9dmFAA'
      }
      onViewportChange={_onViewportChange}>
      <ul>
        <Lakes zoom={viewport.zoom} handleLakes={handleLakes} />
      </ul>
    </ReactMapGL>
  );
}
