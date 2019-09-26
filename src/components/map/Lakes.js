import React from 'react';
import { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import pin from '../../assets/pin.svg';

const StyledMapLinkWrapper = styled.div`
  a {
    color: white;
    text-decoration: none;

    div {
      display: flex;
      &.background-solid > div {
        color: black;
        background-color: white;
        margin-left: 5px;
        padding: 4px;
        border-radius: 3px;
      }
    }
  }
`;

const Lakes = ({ zoom, lakes }) => {
  return (
    <div>
      {lakes.map(lake => {
        let facility;
        if (zoom < 8) {
          facility = (
            <div>
              <img src={pin} alt='map pin icon' />
            </div>
          );
        } else {
          facility = (
            <div className='background-solid'>
              <img src={pin} alt='map pin icon' />
              <div>{lake.facilityName}</div>
            </div>
          );
        }
        return (
          <Marker key={lake.id} latitude={lake.latitude} longitude={lake.longitude}>
            <Modal
              trigger={
                <StyledMapLinkWrapper>
                  <Link className='ui button' to={`/map/${lake.id}`}>
                    {facility}
                  </Link>
                </StyledMapLinkWrapper>
              }
            />
          </Marker>
        );
      })}
    </div>
  );
};
export default Lakes;
