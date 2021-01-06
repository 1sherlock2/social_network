import s from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import Rooms from "./components/Rooms/Rooms";
import { RoomUsed } from "./components/RoomUsed/RoomUsed";
import { socket } from "./sockets/sockets";

const App = () => {
  // socket();
  return (
    <div className={s.main}>
      <Rooms />
      <RoomUsed />
      {/* <Chat /> */}
    </div>
  );
};

export default App;
