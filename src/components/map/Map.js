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

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={
        'pk.eyJ1IjoibG9zZXBoamFtYmVydCIsImEiOiJjazB3cG1mNnAxY2ltM21wb2JsdnUzajNsIn0.BLFLlkgEnpDe553A9dmFAA'
      }
      onViewportChange={viewport => setViewport({ viewport })}>
      <ul>
        <Lakes zoom={viewport.zoom} />
      </ul>
    </ReactMapGL>
  );
}
