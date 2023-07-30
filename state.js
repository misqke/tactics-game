const Game = require("./models/game.js");

const state = {
  games: [],
  addGame(data) {
    const exists = this.games.findIndex((g) => g.gameName === data.gameName);
    if (exists !== -1) {
      return { error: true, msg: "A game by this name currently exists" };
    } else {
      const game = new Game(data);
      this.games.push(game);
      return { error: false, game };
    }
  },
  removeGame(gameName) {
    const index = this.games.findIndex((g) => g.gameName === gameName);
    this.games.splice(index, 1);
  },
  joinGame(gameName, username) {
    const index = this.games.findIndex((g) => g.gameName === gameName);
    if (index === -1) {
      return { error: true, msg: "This game no longer exists." };
    } else if (this.games[index].stated === true) {
      return { error: true, msg: "This game has already started." };
    } else if (this.games[index].player2 !== null) {
      return { error: true, msg: "This game is full." };
    } else {
      this.games[index].player2 = { username, team: "Human" };
      return { error: false, game: this.games[index] };
    }
  },
  getLobbies() {
    const lobbies = this.games.filter((g) => g.started === false);
    return lobbies;
  },
  leaveGame(gameName, username) {
    const index = this.games.findIndex((g) => g.gameName === gameName);
    if (this.games[index].player1.username === username) {
      this.games.splice(index, 1);
      return { deleted: true };
    } else {
      this.games[index].player2 = null;
      return { deleted: false, game: this.games[index] };
    }
  },
  updateGameLobby(game) {
    const index = this.games.findIndex((g) => (g.gameName = game.gameName));
    this.games[index] = game;
    return game;
  },
  startGame(game) {
    const index = this.games.findIndex((g) => (g.gameName = game.gameName));
    this.games[index].started = true;
    return this.games[index];
  },
};

module.exports = state;
