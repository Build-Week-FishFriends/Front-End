import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosWithAuth from '../auth/WithAuth';
import LogCard from '../logs/logCard';

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
