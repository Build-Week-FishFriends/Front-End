import React from 'react';
import styled from 'styled-components';
import DeleteLog from './deleteLog';

const StyledLogCard = styled.li`
  list-style: none;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 0 3px 0px black;
  border-radius: 3px;

  h3 {
    font-size: 1.6rem;
  }

  button {
    width: 75%;
    margin-top: 50px;
  }
`;

const LogCard = ({ handleDeleteLog, log }) => (
  <StyledLogCard className="logprofile">
    <h3>{log.facilityName}</h3>
    <div>
      <p>
        Fish caught: {log.fishCount} {log.fishName}
      </p>
    </div>
    <div>
      <p>Bait used: {log.baitType}</p>
    </div>
    <div>
      <p>Time spent: {log.timeSpent}</p>
    </div>
    <div>
      <p>Time of day: {log.timeOfDay}</p>
    </div>
    <DeleteLog handleDeleteLog={handleDeleteLog} id={log.log_id} />
  </StyledLogCard>
);
export default LogCard;
