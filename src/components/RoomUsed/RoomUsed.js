import React, { useEffect, useState } from 'react';
import { socket } from '../../sockets/sockets';
import s from './RoomUsed.module.css';

const RoomUsed = () => {
  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    socket.on('postAllUsers', (data) => {
      setUsersArray(data);
    });
  }, []);
  console.log(usersArray);

  return (
    <div className={s.roomUsed}>
      <div className={s.roomUser_title}>Room used:</div>
      <div className={s.roomUsed_content}>
        {usersArray?.map((item, index) => {
          return <span key={`${item} with ${index}`}>{item}</span>;
        })}
      </div>
    </div>
  );
};

export default RoomUsed;
