import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosWithAuth from '../auth/WithAuth';

const LogCard = () => (
  <li>
    <div>Log Card</div>
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
        setLogs(logs => [...logs, ...res.data]);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  }, [user.userId]);

  // button to delete a log
  // /logRoute/user-logs/delete-logs/:id

  return (
    <section>
      <h2>
        Hello {user.firstName} {user.lastName}
      </h2>
      <ul>
        {logs.map(log => (
          <LogCard />
        ))}
      </ul>
    </section>
  );
};

export default UserProfile;
