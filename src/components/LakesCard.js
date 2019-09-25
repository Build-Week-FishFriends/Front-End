import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Header, Image, Modal, Item } from "semantic-ui-react";

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
    <>
      <Modal.Header>{nowLake.facilityName}</Modal.Header>

      <Modal.Description>
        <p>{nowLake.directions}</p>
      </Modal.Description>
    </>
  );
}

export default LakesCard;
