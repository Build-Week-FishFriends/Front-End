import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Header, Image, Modal, Item } from "semantic-ui-react";
import LogList from "./logs/logList";
import styled from "styled-components";
import back from "../assets/back.svg";

const StyledModalWrapper = styled.div`
  background-color: white;
  position: fixed;
  top: 3%;
  right: 3%;
  bottom: 3%;
  left: 3%;
  z-index: 9999;
  box-shadow: 0 0 6px 2px black;
  padding: 100px 25px;
  border-radius: 6px;
  overflow: scroll;
  .modal-close {
    position: absolute;
    width: 40px;
    height: 40px;
    padding: 0;
    padding-top: 4px;
    top: 10px;
    left: 10px;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 100%;
    border: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

function LakesCard(props) {
  const [nowLake, setNowLake] = useState({});

  const { match } = props;
  const id = match.params.id;
  useEffect(() => {
    console.log("Lakes Card, use effect");
    axios
      .get(`https://fish-friends.herokuapp.com/waterBodies/${id}`)
      .then(res => {
        setNowLake(res.data);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  }, [id]);

  return (
    <StyledModalWrapper>
      <button className="modal-close" onClick={() => props.history.goBack()}>
        <img src={back} alt="back button" />
      </button>
      <h2>{nowLake.facilityName}</h2>

      <section>
        <section>
          <h3>Directions</h3>
          <p>{nowLake.directions}</p>
        </section>
        <section>
          <h3>Recent Logs</h3>
          {<LogList id={id} />}
        </section>
      </section>
    </StyledModalWrapper>
  );
}

export default LakesCard;
