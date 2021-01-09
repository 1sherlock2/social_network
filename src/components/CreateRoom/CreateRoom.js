import React from "react";
import s from "./CreateRoom.module.css";

const CreateRoom = (createRoomFunc) => {
  return (
    <form className={s.createRoom} onClick={createRoomFunc}>
      <input
        className={s.newRoomName}
        name="newRoomName"
        type="text"
        placeholder="Room name"
      />
      <input
        className={s.newRoomName}
        name="newRoomPass"
        type="text"
        placeholder="Room password"
      />
    </form>
  );
};

export default CreateRoom;