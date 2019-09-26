import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Header, Image, Modal, Item } from "semantic-ui-react";
import LogList from "./logs/logList";
import styled from "styled-components";
import back from "../assets/back.svg";
import { Link } from "react-router-dom";
import WithAuth from "./auth/WithAuth";

const StyledModalWrapper = styled.div`
  background-color: #FBEEC1;
  position: fixed;
  top: 3%;
  right: 3%;
  bottom: 3%;
  left: 3%;
  z-index: 9999;
  box-shadow: 0 0 6px 2px black;
  padding: 100px 25px;
  border-radius: 10px;
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
    background-color: #BC986A;
    border-radius: 100%;
    border: 1px solid #BC986A;
    &:hover {
      background-color: #8D8741;
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
      <h1>{nowLake.facilityName}</h1>
      <section>
        <section>
          <h3>Directions</h3>
          <p>{nowLake.directions}</p>
        </section>
        <section>
          <h3>Recent Logs</h3>
          {<LogList id={id} />}
        </section>
        <Link className="logLink" to={`/logsform/${id}`}>
          Add a Log
        </Link>
      </section>
      
    </StyledModalWrapper>
  );
}

export default LakesCard;
