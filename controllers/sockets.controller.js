const Room = require('../classes/Room')
const User = require('../classes/User')

const user = new User()
const room = new Room()
const socketController = (client, io) => {
  client.on('create-room', ({roomCode, userName, variation}) => {
    client.join(roomCode)
    user.addUser(client.id, userName, roomCode)
    room.addRoom(
      roomCode,
      {
        id: client.id,
        userName,
        score: 0,
        continue: false,
      },
      variation,
    )
  })

  client.on('join-room', ({roomCode, userName}) => {
    const roomData = room.getRoom(roomCode)
    client.join(roomCode)
    user.addUser(client.id, userName, roomCode)
    room.addUser(roomCode, {
      id: client.id,
      userName,
      score: 0,
      continue: false,
    })

    room.getUsersByRoom(roomCode).forEach((user) => {
      io.to(user.id).emit('start-game', {
        opponent: room.opponent(roomCode, user.id),
        variation: roomData.variation,
      })
    })
  })
}

module.exports = socketController
