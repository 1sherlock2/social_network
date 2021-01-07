import React from "react";
import s from "./RoomUsed.module.css";

export const RoomUsed = ({ users }) => {
  return (
    <div className={s.roomUsed}>
      Room used:
      {users?.map((item, index) => {
        return <span key={`${item} with ${index}`}>{item}</span>;
      })}
    </div>
  );
};
