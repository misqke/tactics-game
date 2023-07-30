export const Lobby = {
  el: {
    gameName: document.getElementById("game-name"),
    backBtn: document.getElementById("back-button"),
    startBtn: document.getElementById("start-button"),
    player1Name: document.getElementById("player-1-name"),
    player1Select: document.getElementById("player-1-select"),
    player2Name: document.getElementById("player-2-name"),
    player2Select: document.getElementById("player-2-select"),
  },
  state: {
    username: "",
    game: {},
  },
  init(socket, username, game) {
    this.state.username = username;
    this.state.game = game;
    this.el.gameName.innerText = game.gameName;
    this.el.player1Name.innerText = game.player1.username;
    this.el.player2Name.innerText =
      game.player2 == null ? "Open" : game.player2.username;

    socket.on("updateGameLobby", (game) => {
      this.state.game = game;
      this.el.player2Name.innerText =
        game.player2 == null ? "Open" : game.player2.username;
    });
  },
};
