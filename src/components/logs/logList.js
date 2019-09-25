import React, { useState, useEffect } from "react";
import axios from "axios";

const LogList = ({ id }) => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    console.log("Logs List, use effect");
    axios
      .get(
        `https://fish-friends.herokuapp.com/logRoute/user-logs/waterBody/${id}`
      )
      .then(res => {
        console.log(res.data);
        setLogs(res.data);
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  }, [id]);

  return (
    <ul>
      {logs.map((log, i) => {
        return (
          <li key={i}>
            <h3>{log.username}</h3>
            <div>
              <h3>Fish Caught</h3>
              <ul>
                <li>{log.fishName}</li>
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LogList;