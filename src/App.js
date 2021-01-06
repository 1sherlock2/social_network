import { useState } from "react";
import s from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { ModalAuth } from "./components/ModalAuth/ModalAuth";
import Rooms from "./components/Rooms/Rooms";
import { RoomUsed } from "./components/RoomUsed/RoomUsed";
import { socket } from "./sockets/sockets";

const App = () => {
  const [openRoom, setOpenRooms] = useState(false);

  if (!openRoom) {
    return <ModalAuth />;
  }

  return (
    <div className={s.main}>
      <Rooms />
      <RoomUsed />
      {/* <Chat /> */}
    </div>
  );
};

export default App;
