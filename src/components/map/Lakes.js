import React, { useState, useEffect } from "react";
import { Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import axios from "axios";
import LakesCard from "../LakesCard";
import { Route } from "react-router-dom";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import PrivateRoute from "../../privateRoute";
import pin from "../../assets/pin.svg";
import styled from "styled-components";

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

const Lakes = ({ zoom, handleLakes }) => {
  const [lakes, setLakes] = useState([]);

  useEffect(() => {
    console.log("use effect");
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

  return (
    <div>
      {lakes.map((lake, id) => {
        let facility;
        if (zoom < 8) {
          facility = (
            <div>
              <img src={pin} alt="map pin icon" />
            </div>
          );
        } else {
          facility = (
            <div className="background-solid">
              <img src={pin} alt="map pin icon" />
              <div>{lake.facilityName}</div>
            </div>
          );
        }
        return (
          <Marker
            key={lake.id}
            latitude={lake.latitude}
            longitude={lake.longitude}
          >
            <Modal
              trigger={
                <StyledMapLinkWrapper>
                  <Link className="ui button" to={`/map/${lake.id}`}>
                    {facility}
                  </Link>
                </StyledMapLinkWrapper>
              }
            />
          </Marker>
        );
      })}
      <PrivateRoute path="/map/:id" component={LakesCard} />
    </div>
  );
};
export default Lakes;
