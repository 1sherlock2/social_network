import React from 'react';
import s from './MainContent.module.css'

const MainContent = ({room}) => {
  console.log(room)
  return (
    <div className={s.main}>
    {/* {room.roomName && <Rooms roomName={room.roomName} /> }
    {room.users && <RoomUsed users={room.users} />}  */}
    {/* <Chat users={users} messages={messages} /> */}
    </div>
  );
}

export default MainContent;
