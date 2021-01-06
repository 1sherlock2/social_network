import React from "react";
import s from "./Chat.module.css";

export const Chat = ({ key, rooms, children }) => {
  return (
    <>
      {rooms?.map((item, index) => {
        return (
          <div key={key} className={s.chat}>
            {children}
          </div>
        );
      })}
    </>
  );
};
