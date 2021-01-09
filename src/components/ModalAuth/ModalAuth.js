import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../API/api";
import CreateRoom from "../CreateRoom/CreateRoom";
import s from "./ModalAuth.module.css";

export const ModalAuth = ({ isOpenRoom }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const { roomId, roomPass } = e.target;
    api
      .entryRoom({
        roomId: roomId.value,
        roomPass: roomPass.value,
      })
      .then((data) => {
        const result = data.data && Object.fromEntries(data.data) 
        isOpenRoom(result);
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
        <Link to='/createRoom'> Create new room </Link>
      </form>
    </div>
  );
};
