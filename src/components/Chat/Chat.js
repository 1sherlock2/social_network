import React, { useState } from 'react';
import { socket } from '../../sockets/sockets';
import s from './Chat.module.css';

const Chat = ({ users, messages }) => {
  const [message, setMessage] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault()
    socket.emit('sendMessage', { id: socket.id, message });
  };
  return (
    <div className={s.chat_block}>
      <div className={s.chat_messages}>chat</div>
      <div className={s.chat_textarea}>
        <form className={s.chat_submit} onSubmit={onSubmit}>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
