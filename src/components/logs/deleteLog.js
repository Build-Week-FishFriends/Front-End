import React from 'react';

const DeleteLog = ({ handleDeleteLog, id }) => (
  <form onSubmit={e => handleDeleteLog(e, id)}>
    <button className='deletelog' type='submit'>Delete Log</button>
  </form>
);
export default DeleteLog;
