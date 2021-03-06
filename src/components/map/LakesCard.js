import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LogList from '../logs/logList';

import back from '../../assets/back.svg';

const StyledModalWrapper = styled.div`
  background-color: #fbeec1;
  position: fixed;
  top: 75px;
  left: 3vh;
  width: 400px;
  max-width: 90%;
  height: 500px;
  z-index: 9999;
  box-shadow: 0 0 6px 2px black;
  padding: 100px 25px;
  border-radius: 10px;
  overflow: scroll;
  .modal-close {
    position: fixed;
    width: 40px;
    height: 40px;
    padding: 0;
    padding-top: 4px;
    top: calc(3vw + 75px);
    left: 5vh;
    margin: 0;
    background-color: #bc986a;
    border-radius: 100%;
    border: 1px solid #bc986a;
    &:hover {
      background-color: #8d8741;
    }
  }
`;

function LakesCard(props) {
  const [nowLake, setNowLake] = useState({});

  const { match } = props;
  const id = match.params.id;
  useEffect(() => {
    axios
      .get(`https://fish-friends.herokuapp.com/waterBodies/${id}`)
      .then(res => {
        setNowLake(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  return (
    <StyledModalWrapper className='modalcard'>
      <button className='modal-close' onClick={() => props.history.push('/map')}>
        <img src={back} alt='back button' />
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
        <Link className='logLink' to={`/logsform/${id}`}>
          Add a Log
        </Link>
      </section>
    </StyledModalWrapper>
  );
}

export default LakesCard;
