const socketIO = require('socket.io');
const rooms = require('./rooms');

let io;
let guestNumber = 1;
let namesUsed = [];
let nickNames = {};
let currentRoom = {};
let arrayUsersInRoom = [];
const assignGuestName = (socket, guestNumber, nickNames, namesUsed) => {
  const name = `Guest ${guestNumber}`;
  nickNames[socket.id] = name;
  socket.emit('nameResult', { success: true, name: name } );
  namesUsed.push(name)
  console.log(namesUsed)
  return guestNumber + 1;
}

const joinRoom = (socket, room) => {
  socket.join(room);
  currentRoom[socket.id] = room
  socket.emit('joinResult', {room: room});
  socket.broadcast.to(room).emit('message', { text: `${nickNames[socket.id]} has joined in ${room}`})
  // const usersInRoom = socket.client.conn.server.clientsCount
  const usersInRoom = io.sockets.sockets;

  let usersInRoomSummary = `Users currently in ${room}: `;
  if (usersInRoom) {
    for (let [key,] of usersInRoom) {
      arrayUsersInRoom.push(key)
      arrayUsersInRoom.forEach( el => {
        if (el === socket.id && arrayUsersInRoom.length > 1) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[el]
      })
    }
    usersInRoomSummary += '.';
    socket.emit('message', { text: usersInRoomSummary});
  }
}

const handleNameChangeAttempts = (socket, nickNames, namesUsed) => {
  socket.on('nameAttempt', (name) => {
    console.log(name)
    // имя начинается или совпадает со строкой 'Guest'
    if (name.indexOf('Guest') === 0) {
      socket.emit('nameResult', { success: false, message: 'Names cannot begin with "Guest"'})
    } else {
      // имя уже используется 
      if (namesUsed.indexOf(name) === 0 ) {
        socket.emit('nameResult', {succes: false, message: 'That name is already use'})
      }
      // переименование пользователя
      const previousName = nickNames[socket.id];
      const previousNameIndex = namesUsed.indexOf(previousName);
      namesUsed.push(name);
      nickNames[socket.id] = name;
      delete nameUsed[previousNameIndex];
      socket.emit('nameResult', { success: true, name: name })
      socket.broadcast.to(currentRoom[socket.id]).emit('message', { text: `${previousName} is now known as ${name}`})
    }
  })
}

const handleMessageBroadcasting = (socket, nickNames) => {
  socket.on('sendMessage', message => {
    socket.broadcast.to(message.room).emit('message', { text: `${nickNames[socket.id]}: ${message.text}` })
  })
}

const handleRoomJoining = socket => {
  socket.on('leave', (room) => {
    socket.leave(currentRoom[socket.id])
    joinRoom(socket, room.newRoom);
  })
} 

const handleClientDisconnection = (socket, nicknames, namesUsed) => {
  socket.on('disconnect', () => {
    const nameIndex = namesUsed.indexOf(nicknames[socket.id])
    delete namesUsed[nameIndex]
    delete nicknames[socket.id]
  })
}

exports.listen = (server) => {
  io = socketIO(server);
  // io.set('log level', 1);
  // io.use((socketIO, next) => {
  //   console.log(socketIO.request)
  //   console.log(next)
  // })
  io.sockets.on('connection', (socket) => {
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    joinRoom(socket, 'Lobby');
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    // handleRoomJoining(socket)
    socket.on('rooms', () => {
      socket.emit('rooms', io.socket.manager.rooms);
      handleClientDisconnection(socket, nickNames, namesUsed);
    })
  })
}