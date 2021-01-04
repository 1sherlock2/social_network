const socket = io()
// console.log(socket)

// ioClient = io.connect('http://localhost:4000');
// ioClient.on('connection', message => console.log(message))

// $("#content").click(() => {
//   socket.emit('sendMessage', { text: 'target'})
// })

const child = (data) => {
  return `<div>${data}</div>`;
}

console.log(socket)

socket.on('nameResult', (data) => {
  data.success ? $('#room-list').append(child(data.name)) : null;
})

socket.on('message', (data) => {
  data.text ? $('#messages').append(child(data.text)) : null;
})

$('#formNickname').submit(e => {
  e.preventDefault();
  socket.emit('nameAttempt', e.target[0].value)
})

e.preventDefault();
$('#exit').submit(e => { 
  socket.emit('leave', 'NewLobby')
})