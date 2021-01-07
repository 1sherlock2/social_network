import { forwardRef, useEffect, useReducer, useRef, useState } from "react";
import s from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { ModalAuth } from "./components/ModalAuth/ModalAuth";
import Rooms from "./components/Rooms/Rooms";
import { RoomUsed } from "./components/RoomUsed/RoomUsed";
import { socket } from "./sockets/sockets";
import { reducer } from "./otherState/reducer";

const App = () => {
  const initialState = { isAuth: false };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [room, setRoom] = useState(null);
  let roomName;

  const isOpenRoom = (data) => {
    dispatch({
      type: "IS_AUTH",
      isAuth: true,
      data,
    });
  };
  useEffect(() => {
    state.data && setRoom(Object.fromEntries(state.data));
  }, [state.data]);

  if (!state.isAuth) {
    return <ModalAuth isOpenRoom={isOpenRoom} />;
  }

  // console.log(roomName, users, messages);
  return (
    <div className={s.main}>
      {/* <Rooms roomName={roomName} /> */}
      {/* <RoomUsed users={users} />
      <Chat users={users} messages={messages} /> */}
    </div>
  );
};

export default App;
