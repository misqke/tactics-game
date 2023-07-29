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
};

module.exports = state;
