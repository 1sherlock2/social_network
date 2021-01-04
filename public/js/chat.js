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

socket.on('nameResult', (data) => {
  data.success ? $('#room-list').append(child(data.name)) : null
})

socket.on('message', (data) => {
  data.text ? $('#messages').append(child(data.text)) : null
})

// $('#form-nickname').submit(e => {
//   e.preventDefault();
//   e.stopPropagation();
//   console.log(e.changeNickName.value)
//   // const data = $('#send-form')[0];
//   // const form = new FormData();
//   // form.append(data)
//   // console.log(data)
// })
console.log($('#formNickname').submit(e => {
  e.preventDefault();
  socket.emit('nameAttempt', e.target[0].value)
}))


document.forms.formNickname.onsubmit = () => {

}

socket.emit('sendMessage', () => {

})