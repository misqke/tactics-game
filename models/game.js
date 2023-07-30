class Game {
  constructor(data) {
    this.gameName = data.gameName;
    this.started = false;
    this.player1 = {
      username: data.player1,
      team: "Human",
    };
    this.player2 = null;
    this.map = "Map 1";
  }
}

module.exports = Game;
