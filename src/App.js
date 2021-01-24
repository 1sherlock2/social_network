import { useEffect, useReducer, useState } from 'react';
import s from './App.module.css';
import { ModalAuth } from './components/ModalAuth/ModalAuth';
import { socket } from './sockets/sockets';
import { reducer } from './otherState/reducer';
import { Route, Switch } from 'react-router-dom';
import CreateRoom from './components/CreateRoom/CreateRoom';
import MainContent from './components/MainContent/MainContent';

const App = () => {
  const initialState = { isAuth: false, createdRoom: false };
  const [state, dispatch] = useReducer(reducer, initialState);

  const outFromRoom = () => {
    dispatch({
      type: 'OUT_FROM_ROOM',
      isAuth: false,
    });
    socket.emit('leave', { payload: state.data })
  };

  const isOpenRoom = (data) => {
    dispatch({
      type: 'IS_AUTH',
      isAuth: true,
      data,
    });
  };
  const isCreateRoom = (bool) => {
    dispatch({
      type: 'CREATED_ROOM',
      createdRoom: bool,
    });
  };
  if (!state.isAuth && !state.createdRoom) {
    return <ModalAuth isOpenRoom={isOpenRoom} isCreateRoom={isCreateRoom} />;
  }

  if (!state.isAuth && state.createdRoom) {
    return <CreateRoom isCreateRoom={isCreateRoom} />;
  }

  return (
    <div className={s.container}>
      <Switch>
        {state.data && (
          <Route exact path="/">
            <MainContent room={state.data} outFromRoom={outFromRoom} />
          </Route>
        )}
      </Switch>
    </div>
  );
};

export default App;
