const socketIO = require('socket.io');
const rooms = require('../roomData');
const { postAllUsers } = require('../utils/socketName');

let io;
let guestNumber = 1;
let namesUsed = [];
let nickNames = {};
let currentRoom = {};
let arrayUsersInRoom = [];

const assignGuestName = (socket, guestNumber, nickNames, namesUsed) => {
  const name = `Guest ${guestNumber}`;
  nickNames[socket.id] = name;
  return guestNumber + 1;
};

const joinRoom = (socket) => {
  const nickName = [nickNames[socket.id]];
  socket.on('getUsersInRoom', (data) => {
    const { roomName } = data;
    if (rooms.has(roomName)) {
      currentRoom.roomName = roomName;
      const getRoom = rooms.get(roomName); // поиск комнаты
      const usersArray = getRoom.get('users'); // добавление нового пользователя в базу данных
      usersArray.set(socket.id, nickName);
      socket.join(roomName); // ВХОД В КОМНАТУ
    } else {
      return new Error(`${roomName} room not found`);
    }
  });
};

const postAlUsers = (socket) => {
  const { roomName } = currentRoom;
  if (roomName) {
    const getRoom = rooms.get(roomName);
    const usersArray = getRoom.get('users');
    const usersArrayForSocket = [...usersArray.values()];
    socket.to(currentRoom.roomName).emit(postAllUsers, usersArrayForSocket); // отправка массива пользователей на фронт
  }
};

// const joinRoom = (socket) => {
//   socket.join(room);
//   // console.log(socket.id);
//   currentRoom[socket.id] = room;
//   socket.emit('joinResult', { room: room });
//   socket.broadcast
//     .to(room)
//     .emit('message', { text: `${nickNames[socket.id]} has joined in ${room}` });
//   // const usersInRoom = socket.client.conn.server.clientsCount
//   const usersInRoom = io.sockets.sockets;

//   let usersInRoomSummary = `Users currently in ${room}: `;
//   if (usersInRoom) {
//     for (let [key] of usersInRoom) {
//       arrayUsersInRoom.push(key);
//     }
//     usersInRoomSummary += '.';
//     socket.emit('message', { text: usersInRoomSummary });
//   }
// };

const handleNameChangeAttempts = (socket, nickNames, namesUsed) => {
  socket.on('nameAttempt', (name) => {
    // имя начинается или совпадает со строкой 'Guest'
    if (name.indexOf('Guest') === 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest"',
      });
    } else {
      // имя уже используется
      if (namesUsed.indexOf(name) === 0) {
        socket.emit('nameResult', {
          succes: false,
          message: 'That name is already use',
        });
      }
      // переименование пользователя
      const previousName = nickNames[socket.id];
      const previousNameIndex = namesUsed.indexOf(previousName);
      namesUsed.splice(previousNameIndex, 1, name);
      socket.emit('nameResult', { success: true, name: name });
      socket.broadcast
        .to(currentRoom[socket.id])
        .emit('message', { text: `${previousName} is now known as ${name}` });
    }
  });
};

const handleMessageBroadcasting = (socket, nickNames) => {
  socket.on('sendMessage', (message) => {
    socket.broadcast
      .to(message.room)
      .emit('message', { text: `${nickNames[socket.id]}: ${message.text}` });
  });
};

const handleRoomJoining = (socket) => {
  socket.on('leave', (room) => {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
    console.log(room);
  });
};

const handleClientDisconnection = (socket, nicknames, namesUsed) => {
  socket.on('disconnect', () => {
    const nameIndex = namesUsed.indexOf(nicknames[socket.id]);
    delete namesUsed[nameIndex];
    delete nicknames[socket.id];
  });
};

exports.listen = (server, rooms) => {
  io = socketIO(server, {
    cors: {
      origin: '*',
    },
  });
  io.sockets.on('connection', (socket) => {
    console.log('users is assigned');
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    joinRoom(socket);
    postAlUsers(socket);
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);
    socket.on('rooms', () => {
      socket.emit('rooms', io.socket.manager.rooms);
      handleClientDisconnection(socket, nickNames, namesUsed);
    });
  });
};
