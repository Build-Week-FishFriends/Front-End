import React from 'react';
import DeleteLog from './deleteLog';

const LogCard = ({ handleDeleteLog, log }) => (
  <li>
    <h3>{log.facilityName}</h3>
    <p>{log.fishName}</p>
    <p>{log.fishCount}</p>
    <p>{log.baitType}</p>
    <p>{log.timeSpent}</p>
    <p>{log.timeOfDay}</p>
    <DeleteLog handleDeleteLog={handleDeleteLog} id={log.log_id} />
  </li>
);
export default LogCard;
