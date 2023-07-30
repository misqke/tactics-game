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
    const game = this.games.find((g) => g.gameName === gameName);
    if (game === undefined) {
      return { error: true, msg: "This game no longer exists." };
    } else if (game.stated === true) {
      return { error: true, msg: "This game has already started." };
    } else if (game.player2 !== null) {
      return { error: true, msg: "This game is full." };
    } else {
      game.player2 = { username };
      return { error: false, game };
    }
  },
};

module.exports = state;
