class Game {
  constructor(data) {
    this.gameName = data.gameName;
    this.started = false;
    this.player1 = {
      username: data.player1,
    };
    this.player2 = null;
    this.map = "default";
  }
}

module.exports = Game;
