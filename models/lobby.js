class Lobby {
  constructor(data) {
    this.gameName = data.gameName;
    this.player1 = data.user;
    this.player2 = null;
  }
}

module.exports = Lobby;
