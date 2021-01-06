import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import s from "./Rooms.module.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [indexRoom, setIndexRoom] = useState(null);

  useEffect(() => {
    api.getRooms().then((data) => setRooms(data.data.rooms));
  }, []);

  const selectRoom = (item, index) => {
    setIndexRoom(index);
  };

  return (
    <div>
      <div className={s.rooms}>
        {rooms?.map((item, index) => {
          return (
            <div
              key={`${item} in ${index}`}
              className={s.roomsItem}
              onClick={() => selectRoom(index)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;
