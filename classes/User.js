class User {
  constructor() {
    this.users = []
  }

  addUser(id, username, room) {
    this.users.push({
      id,
      username,
      room,
    })
  }
}

module.exports = User
