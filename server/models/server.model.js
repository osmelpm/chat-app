require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const { socketController } = require('../sockets/controller.sockets')
const socketIO = require('socket.io')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {}

    this.server = createServer(this.app)
    this.io = socketIO(this.server)
    this.middlewares()
    this.routes()
    this.sockets()
  }

  middlewares() {
    this.app.use(express.static('public'))
    this.app.use(cors())
  }

  routes() {
    //this.app.use(this.paths.auth, require('../routes/auth.routes'))
  }

  //sockets
  sockets() {
    this.io.on('connection', (socket) => socketController(socket, this.io))
  }

  listen() {
    this.server.listen(this.port, () =>
      console.log('WebSocket Chat running in port:', this.port),
    )
  }
}

module.exports = Server
