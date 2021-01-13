import React from 'react';
import Rooms from '../Rooms/Rooms';
import RoomUsed from '../RoomUsed/RoomUsed';
import Chat from '../Chat/Chat';
import s from './MainContent.module.css'

const MainContent = ({room}) => {
  console.log(room)
  return (
    <div className={s.main}>
      <Rooms roomName={room.roomName} /> 
      <RoomUsed users={room.users} />
      <Chat users={room.users} messages={room.messages} /> 
    </div>
  );
}

export default MainContent;
