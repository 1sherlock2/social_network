import {  useEffect, useReducer, useState } from "react";
import s from "./App.module.css";
import { ModalAuth } from "./components/ModalAuth/ModalAuth";
import { socket } from "./sockets/sockets";
import { reducer } from "./otherState/reducer";
import { Route, Switch } from 'react-router-dom';
import CreateRoom from "./components/CreateRoom/CreateRoom";
import MainContent from "./components/MainContent/MainContent";

const App = () => {
  const initialState = { isAuth: false };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [room, setRoom] = useState(null);

  const isOpenRoom = (data) => {
    dispatch({
      type: "IS_AUTH",
      isAuth: true,
      data,
    });
  };
  useEffect(() => {
    setRoom(state.data);
  }, [state.data]);

  if (!state.isAuth) {
    return <ModalAuth isOpenRoom={isOpenRoom} />;
  }

  return (
    <div className={s.container}>
      <Switch>
        <Route path='/createRoom'><CreateRoom /></Route> 
        <Route path='/'><MainContent room={room} /></Route>
      </Switch>
    </div>
  );
};

export default App;
