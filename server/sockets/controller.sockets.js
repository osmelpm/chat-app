const { Users } = require('../models/users.model')
const { createMessage } = require('../utils/create-message')

const users = new Users()

const socketController = (socket, io) => {
  socket.on('in-chat', ({ name, room }, callback) => {
    if (!name || !room) {
      return callback({
        error: true,
        msg: 'name and romm are required',
      })
    }

    socket.join(room)

    users.addUser(socket.id, name, room)

    const usersOnline = users.getUsersByRoom(room)
    callback(usersOnline)

    socket.broadcast.to(room).emit('list-users', users.getUsersByRoom(room))
  })

  socket.on('disconnect', () => {
    const { name, room } = users.disconnectUser(socket.id)

    socket.broadcast
      .to(room)
      .emit('create-message', createMessage('Admin', `${name} left the chat`))

    socket.broadcast.to(room).emit('list-users', users.getUsersByRoom(room))
  })

  socket.on('create-message', ({ message }) => {
    const { name, room } = users.getUser(socket.id)
    io.to(room).emit('create-message', createMessage(name, message))
  })

  socket.on('private-message', ({ para, message }) => {
    const { name } = users.getUser(socket.id)

    io.to(para).emit('private-message', createMessage(name, message))
  })
}

module.exports = {
  socketController,
}
