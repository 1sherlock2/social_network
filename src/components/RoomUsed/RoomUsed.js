import React from "react";
import { socket } from "../../sockets/sockets";
import s from "./RoomUsed.module.css";

const RoomUsed = ({ users }) => {
// const usersArray = Object.values(users) || [];
console.log(users)

  return (
    <div className={s.roomUsed}>
      {/* Room used:
      {usersArray?.map((item, index) => {
        return <span key={`${item} with ${index}`}>{item}</span>;
      })} */}
    </div>
  );
};

export default RoomUsed;