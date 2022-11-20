class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    const user = { id, name, room }
    this.users.push(user)
    return user
  }

  getUser(id) {
    return this.users.find((user) => user.id === id)
  }

  get getAllUsers() {
    return this.users
  }

  getUsersByRoom(room) {
    const users = this.users.filter((user) => user.room === room)
    return users
  }

  disconnectUser(id) {
    const user = this.getUser(id)
    this.users = this.users.filter((user) => user.id !== id)
    return user
  }
}

module.exports = {
  Users,
}
