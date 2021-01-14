import React from "react";
import s from "./Rooms.module.css";

const Rooms = ({ roomName }) => {
  return (
    <div>
      <div className={s.rooms}>{roomName}</div>
    </div>
  );
};

export default Rooms;
