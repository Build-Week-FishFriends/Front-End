import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import Lakes from './Lakes';
import PrivateRoute from '../../privateRoute';
import LakesCard from '../LakesCard';
import styled from 'styled-components';

const StyledMapWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export default function Map({ lakes }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 47.605514,
    longitude: -121.668538,
    zoom: 5,
  });

  const _onViewportChange = viewport => {
    setViewport({ ...viewport });
  };

  return (
    <StyledMapWrapper>
      <ReactMapGL
        mapStyle='mapbox://styles/mapbox/dark-v9'
        {...viewport}
        mapboxApiAccessToken={
          'pk.eyJ1IjoibG9zZXBoamFtYmVydCIsImEiOiJjazB3cG1mNnAxY2ltM21wb2JsdnUzajNsIn0.BLFLlkgEnpDe553A9dmFAA'
        }
        onViewportChange={_onViewportChange}>
        <ul>
          <Lakes zoom={viewport.zoom} lakes={lakes} />
        </ul>
      </ReactMapGL>
      <PrivateRoute path='/map/:id' component={LakesCard} />
    </StyledMapWrapper>
  );
}
