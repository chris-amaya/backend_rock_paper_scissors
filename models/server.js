const express = require('express')
const cors = require('cors')
const socketController = require('../controllers/sockets.controller')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)
    this.paths = {}
    this.middlewares()
    this.sockets()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  sockets() {
    this.io.on('connection', (client) => socketController(client, this.io))
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Server running on:', this.port)
    })
  }
}

module.exports = Server
