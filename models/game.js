class Game {
  constructor(data) {
    this.gameName = data.gameName;
    this.started = false;
    this.player1 = data.player1;
    this.player2 = null;
  }
}

module.exports = Game;
