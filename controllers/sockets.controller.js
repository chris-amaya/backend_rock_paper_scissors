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

  client.on('user-has-selected', ({roomCode, selection, variation}) => {
    const roomData = room.getRoom(roomCode)
    const opponent = room.opponent(roomCode, client.id)

    client.broadcast.to(opponent.id).emit('user-has-selected', {
      selection,
      userId: client.id,
    })

    room.saveSelection(roomCode, client.id, selection)
    if (room.allUserHaveSelected(roomCode)) {
      const winner = room.winner(roomCode, roomData.variation)
      if (winner !== 'TIE') {
        room.incrementUserScore(roomCode, winner.id)
      }
      const users = room.getUsersByRoom(roomCode)

      io.in(roomCode).emit('winner', winner)
      io.in(roomCode).emit('score', users)

      room.resetGame(roomCode)
    }
  })

  client.on('reset-game', ({codeRoom}) => {
    room.continuePlaying(codeRoom, client.id)
    if (room.continueGame(codeRoom)) {
      room.getUsersByRoom(codeRoom).forEach((user) => {
        io.to(user.id).emit('continue-game', {})
      })
    }
  })
}

module.exports = socketController
