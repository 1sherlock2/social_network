import React from 'react';
import s from './BackButton.module.css';

const BackButton = ({ outFromRoom }) => {
  return (
    <div className={s.backButton}>
      <button onClick={outFromRoom} >
        Out from room
      </button>
    </div>
  )
}
export default BackButton;
