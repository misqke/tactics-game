const User = require("./models/user");
const Lobby = require("./models/lobby");

const state = {
  users: [],
  lobbies: [],
  firstNames: [
    "Curious",
    "Ambitious",
    "Lazy",
    "Angry",
    "Despicable",
    "Cowardly",
    "Enraged",
  ],
  lastNames: [
    "Monkey",
    "Donkey",
    "Snake",
    "Tiger",
    "Moose",
    "Bear",
    "Spider",
    "Turtle",
    "Fish",
  ],
  getRandomName(attempt) {
    if (attempt >= 5) {
      return (
        Math.floor(Math.random() * 100 + 1) *
        Math.floor(Math.random() * 100 + 1)
      );
    }
    const first =
      this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
    const last =
      this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
    const randomName = first + last;
    const exists = this.users.findIndex((u) => u.name === randomName);
    if (exists === -1) return randomName;
    else this.getRandomName(attempt + 1);
  },
  addUser(id) {
    const name = this.getRandomName(1);
    const user = new User({ name, id });
    console.log(`new user joined: ${name} (${id})`);
    this.users.push(user);
    return user;
  },
  removeUser(id) {
    const userLobby = this.lobbies.findIndex((l) => l.player1.id === id);
    if (userLobby !== -1) {
      this.lobbies.splice(userLobby, 1);
    }
    const index = this.users.findIndex((u) => u.id === id);
    console.log(
      `removing user: ${this.users[index].name} (${this.users[index].id})`
    );
    this.users.splice(index, 1);
  },
  addLobby(data) {
    const lobby = new Lobby(data);
    this.lobbies.push(lobby);
    console.log(
      `New game: ${lobby.gameName} created by: ${lobby.player1.name}`
    );
    return lobby;
  },
  removeLobby(gameName) {
    const index = this.lobbies.findIndex((l) => l.gameName === gameName);
    this.lobbies.splice(index, 1);
  },
};

module.exports = state;
