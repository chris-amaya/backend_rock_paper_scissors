const {compare} = require('../utils/functions')

class Room {
  constructor() {
    this.rooms = []
  }

  addRoom(room, user, variation) {
    this.rooms.push({
      roomId: room,
      variation,
      users: [user],
    })
  }

  getRoom(roomId) {
    const index = this.rooms.findIndex((room) => room.roomId === roomId)
    return this.rooms[index]
  }

  addUser(roomId, user) {
    const index = this.rooms.findIndex((room) => room.roomId === roomId)
    this.rooms[index].users.push(user)
  }

  getUsersByRoom(roomId) {
    return this.rooms.filter((room) => room.roomId === roomId)[0].users
  }

  opponent(roomId, userId) {
    const {users} = this.rooms.filter((room) => room.roomId === roomId)[0]
    const [player1, player2] = users

    return player1.id === userId ? player2 : player1
  }

  saveSelection(roomId, userId, selection) {
    const roomIndex = this.rooms.findIndex((room) => room.roomId === roomId)
    const userIndex = this.rooms[roomIndex].users.findIndex(
      (user) => user.id === userId,
    )

    this.rooms[roomIndex].users[userIndex].selection = selection
  }

  allUserHaveSelected(roomId) {
    const {users} = this.rooms.filter((room) => room.roomId === roomId)[0]
    let counter = 0

    users.forEach((user) => {
      if (user.selection) {
        counter++
      }
    })

    return counter === 2
  }

  winner(roomId, version) {
    const {users} = this.rooms.filter((room) => room.roomId === roomId)[0]
    const [player1, player2] = users

    const choice1 = player1.selection
    const choice2 = player2.selection

    const winner = compare(choice1, choice2, version)

    if (winner === 'TIE') {
      return winner
    }

    return winner === 'PLAYER_1' ? player1 : player2
  }

  incrementUserScore(roomId, userId) {
    const roomIndex = this.rooms.findIndex((room) => room.roomId === roomId)
    const userIndex = this.rooms[roomIndex].users.findIndex(
      (user) => user.id === userId,
    )
    const userScore = this.rooms[roomIndex].users[userIndex].score
    this.rooms[roomIndex].users[userIndex].score = userScore + 1
  }

  resetGame(roomId) {
    const roomIndex = this.rooms.findIndex((room) => room.roomId === roomId)
    this.rooms[roomIndex].users = this.rooms[roomIndex].users.map((user) => {
      return {...user, selection: null, continue: false}
    })
  }

  continuePlaying(roomId, userId) {
    const roomIndex = this.rooms.findIndex((room) => room.roomId === roomId)
    const userIndex = this.rooms[roomIndex].users.findIndex(
      (user) => user.id === userId,
    )
    this.rooms[roomIndex].users[userIndex].continue = true
  }

  continueGame(roomId) {
    const {users} = this.rooms.filter((room) => room.roomId === roomId)[0]
    let counter = 0

    users.forEach((user) => {
      if (user.continue === true) {
        counter++
      }
    })

    return counter === 2
  }
}

module.exports = Room
