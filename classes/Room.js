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
}

module.exports = Room
