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

    console.log(room.getRoom(roomCode))
  })
}

module.exports = socketController
