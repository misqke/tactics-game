export const Lobby = {
  el: {
    gameName: document.getElementById("game-name"),
    backBtn: document.getElementById("back-button"),
    startBtn: document.getElementById("start-button"),
    player1Name: document.getElementById("player-1-name"),
    player1Select: document.getElementById("player-1-select"),
    player2Name: document.getElementById("player-2-name"),
    player2Select: document.getElementById("player-2-select"),
    messageInput: document.getElementById("lobby-message-input"),
    sendMsgBtn: document.getElementById("lobby-message-button"),
    msgContainer: document.getElementById("lobby-message-container"),
    mapSelect: document.getElementById("map-select"),
  },
  state: {
    username: "",
    game: {},
    initiated: false,
    socket: null,
  },
  init(socket, username, game) {
    this.state.username = username;
    this.state.game = game;
    this.setElements();

    if (this.state.initiated === false) {
      this.socket = socket;
      socket.on("updateGameLobby", (game) => {
        this.state.game = game;
        this.setElements();
      });

      socket.on("newLobbyMsg", (data) => {
        this.generateMessage(data);
      });

      socket.on("startingGame", () => {});

      this.el.sendMsgBtn.onclick = () => {
        const msg = this.el.messageInput.value;
        if (msg.length > 0) {
          socket.emit("createLobbyMsg", {
            gameName: this.state.game.gameName,
            msg,
          });
          this.el.messageInput.value = "";
        }
      };

      this.el.player1Select.onchange = (e) => {
        this.state.game.player1.team = e.target.value;
        socket.emit("updateGameLobbyInfo", this.state.game);
      };
      this.el.player2Select.onchange = (e) => {
        this.state.game.player2.team = e.target.value;
        socket.emit("updateGameLobbyInfo", this.state.game);
      };

      this.el.startBtn.onclick = () => {
        socket.emit("startGame", this.state.game);
      };

      this.initiated = true;
    }
  },
  setElements() {
    this.el.mapSelect.value = this.state.game.map;
    this.el.gameName.innerText = this.state.game.gameName;
    this.el.player1Name.innerText = this.state.game.player1.username;
    this.el.player1Select.value = this.state.game.player1.team;
    if (this.state.game.player2 === null) {
      this.el.player2Name.innerText = "Open";
      this.el.startBtn.disabled = true;
    } else {
      this.el.player2Name.innerText = this.state.game.player2.username;
      this.el.startBtn.disabled = false;
      this.el.player2Select.value = this.state.game.player2.team;
    }
    if (this.state.game.player1.username === this.state.username) {
      this.el.startBtn.classList.remove("hidden");
      this.el.player2Select.disabled = true;
      this.el.player1Select.disabled = false;
      this.el.mapSelect.disabled = false;
    } else {
      this.el.startBtn.classList.add("hidden");
      this.el.player2Select.disabled = false;
      this.el.player1Select.disabled = true;
      this.el.mapSelect.disabled = true;
    }
  },
  generateMessage(data) {
    const msg = document.createElement("p");
    msg.classList.add("msg");
    if (data.username === this.state.username) msg.classList.add("myMsg");
    msg.innerHTML = `<strong>${data.username}:</strong> ${data.msg}`;
    this.el.msgContainer.append(msg);
  },
};
