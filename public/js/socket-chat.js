const socket = io()
const params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
  window.location = 'index.html'
  throw new Error('name and room are required in the url params')
}

const user = {
  name: params.get('name'),
  room: params.get('room'),
}

socket.on('connect', () => {
  socket.emit('in-chat', user, (res) => {
    console.log(res)
  })
})

socket.on('create-message', (mensaje) => {
  console.log(mensaje)
})

socket.on('list-users', (list) => {
  console.log(list)
})

socket.on('private-message', (message) => {
  console.log('Private message: ', message)
})
