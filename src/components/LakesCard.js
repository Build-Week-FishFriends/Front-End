import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Header, Image, Modal, Item } from "semantic-ui-react";
import LogList from "./logs/logList";
import styled from "styled-components";

const StyledModalWrapper = styled.div`
  background-color: white;
  position: fixed;
  top: 3%;
  right: 3%;
  bottom: 3%;
  left: 3%;
  z-index: 9999;
  box-shadow: 0 0 6px 2px black;
  padding: 10px;
  border-radius: 6px;
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
      <button onClick={() => props.history.goBack()}>Close Modal</button>
      <Modal.Header>{nowLake.facilityName}</Modal.Header>

      <Modal.Description>
        <p>{nowLake.directions}</p>
        <section>{<LogList id={id} />}</section>
      </Modal.Description>
    </StyledModalWrapper>
  );
}

export default LakesCard;
