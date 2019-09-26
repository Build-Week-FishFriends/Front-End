import React, { useState, useEffect } from "react";
import axios from "axios";


const LogList = (props) => {
  const [logs, setLogs] = useState([]);
  const {id} = props;

  console.log("idd", id)

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
           
           
            <div>
            <h1>{log.username}</h1>
              <ul>
                <li>Fish caught : {log.fishName}.</li>
                <li>Fish Amount : {log.fishCount}</li>
                <li>Time spent  : {log.timeSpent}</li>
                <li>Time Of Day : {log.timeOfDay}</li>
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LogList;
