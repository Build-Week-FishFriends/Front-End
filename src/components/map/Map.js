import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import Lakes from './Lakes';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class Map extends Component {
  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 47.605514,
      longitude: -121.668538,
      zoom: 5,
    },
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={
          'pk.eyJ1IjoibG9zZXBoamFtYmVydCIsImEiOiJjazB3cG1mNnAxY2ltM21wb2JsdnUzajNsIn0.BLFLlkgEnpDe553A9dmFAA'
        }
        onViewportChange={viewport => this.setState({ viewport })}>
        <ul>
          <Lakes zoom={this.state.zoom} />
        </ul>
      </ReactMapGL>
    );
  }
}
