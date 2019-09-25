import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosWithAuth from '../auth/WithAuth';

const DeleteLog = ({ handleDeleteLog, id }) => (
  <form onSubmit={e => handleDeleteLog(e, id)}>
    <button type='submit'>Delete Log</button>
  </form>
);
const LogCard = ({ handleDeleteLog, log }) => (
  <li>
    <div>Log Card</div>
    <h3>{log.facilityName}</h3>
    <p>{log.fishName}</p>
    <p>{log.fishCount}</p>
    <p>{log.baitType}</p>
    <p>{log.timeSpent}</p>
    <p>{log.timeOfDay}</p>
    <DeleteLog handleDeleteLog={handleDeleteLog} id={log.log_id} />
  </li>
);

const UserProfile = ({ user, match, history, location }) => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get(`/logRoute/user-logs/`, {
        params: {
          id: user.userId,
        },
      })
      .then(res => {
        setLogs([...res.data]);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  }, [user.userId]);

  useEffect(() => {});

  const deleteLog = (e, log_id) => {
    e.preventDefault();
    console.log('delete log');
    axiosWithAuth()
      .delete(`/logRoute/user-logs/delete-logs/${log_id}`)
      .then(res => {
        console.log(res.data);
        const filteredLogs = logs.filter(log => {
          return log.log_id !== log_id;
        });
        console.log('filtered logs', filteredLogs);
        setLogs(filteredLogs);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  };

  return (
    <section>
      <h2>
        Hello {user.firstName} {user.lastName}
      </h2>
      <ul>
        {logs.map(log => (
          <LogCard key={log.log_id} handleDeleteLog={deleteLog} log={log} />
        ))}
      </ul>
    </section>
  );
};

export default UserProfile;
