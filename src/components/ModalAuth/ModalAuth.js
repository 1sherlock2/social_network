import React, { useRef, useState } from "react";
import { api } from "../../API/api";
import s from "./ModalAuth.module.css";

export const ModalAuth = () => {
  // const [roomId, setRoomId] = useState('')
  // const [roomPass, setRoomPass] = useState('')

  const handleClick = (e) => {
    e.preventDefault();
    const { roomId, roomPass } = e.target;
    api.entryRoom({
      roomId: roomId.value,
      roomPass: roomPass.value,
    });
  };
  return (
    <div className={s.modal}>
      Please fill form for entry to the room
      <form className={s.formModal} onSubmit={handleClick}>
        <input
          className={s.modalId}
          name="roomId"
          type="text"
          placeholder="Id rooms"
        />
        <input
          className={s.modalPass}
          name="roomPass"
          type="text"
          placeholder="Password"
        />
        <button>Entry</button>
      </form>
    </div>
  );
};
