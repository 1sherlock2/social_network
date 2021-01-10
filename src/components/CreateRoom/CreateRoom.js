import React from "react";
import { api } from "../../API/api";
import s from "./CreateRoom.module.css";

const CreateRoom = ({isCreateRoom}) => {
  const createRoomFunc = (e) => {
    e.preventDefault();
    const {newRoomName , newRoomPass} = e.target;
    api.createRoom({
       newRoomName: newRoomName.value,
       newRoomPass: newRoomPass.value
    }).then(data => {
      data.data && isCreateRoom(false)
    })
  }

  const goBack = () => {
    isCreateRoom(false)
  }
  return (
    <div className={s.containerCreateRoom}>
      <h1> Creating own Room</h1>
      <form className={s.createRoom} onSubmit={createRoomFunc}>
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
        <button> Create </button>
      </form>
      <button onClick={goBack}> Back </button>
    </div>
  );
};

export default CreateRoom;