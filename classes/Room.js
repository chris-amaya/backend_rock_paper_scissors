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
}

module.exports = Room
