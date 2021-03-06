import React, { useEffect } from 'react';
import Rooms from '../Rooms/Rooms';
import RoomUsed from '../RoomUsed/RoomUsed';
import Chat from '../Chat/Chat';
import BackButton from '../../parts/BackButton';
import { socket } from '../../sockets/sockets';
import s from './MainContent.module.css';

const MainContent = ({ room, outFromRoom }) => {
  useEffect(() => {
    socket.emit('getUsersInRoom', { roomName: room.roomName });
  }, [room]);
  return (
    <div className={s.content}>
      <BackButton outFromRoom={outFromRoom} />
      <div className={s.main}>
        <Rooms roomName={room.roomName} />
        <RoomUsed users={room.users} />
        <Chat users={room.users} messages={room.messages} />
      </div>
    </div>
  );
};

export default MainContent;
