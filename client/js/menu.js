export const Menu = {
  el: {
    username: document.getElementById("username"),
    newGameInput: document.getElementById("new-lobby-name-input"),
    newGameButton: document.getElementById("new-lobby-button"),
    lobbyContainer: document.getElementById("main-menu-lobby-grid"),
    mainMenuMsgContainer: document.getElementById(
      "main-menu-message-container"
    ),
    mainMenuMsgInput: document.getElementById("main-menu-message-input"),
    mainMenuMsgButton: document.getElementById("main-menu-message-button"),
  },
  state: {
    username: "",
    socket: null,
    initiated: false,
  },
  init(socket, username) {
    this.state.username = username;
    if (this.state.initiated === false) {
      this.socket = socket;
      socket.on("lobbiesUpdate", (lobbies) => {
        this.generateLobbies(lobbies);
      });

      socket.on("newMainMenuMsg", (data) => {
        this.generateMessage(data);
      });

      socket.on("failedCreateGame", (data) => {
        alert(data.msg);
      });

      socket.on("failedJoinGame", (data) => {
        alert(data.msg);
        this.generateLobbies(data.lobbies);
      });

      this.el.newGameButton.onclick = () => {
        const lobbyName = this.el.newGameInput.value;
        socket.emit("createGame", lobbyName);
        this.el.newGameInput.value = "";
      };

      this.el.mainMenuMsgButton.onclick = () => {
        const msg = this.el.mainMenuMsgInput.value;
        if (msg.length > 0) {
          socket.emit("createMainMenuMsg", msg);
          this.el.mainMenuMsgInput.value = "";
        }
      };
      this.initiated = true;
    }
  },
  generateLobbies(lobbies) {
    this.el.lobbyContainer.innerHTML = "";
    lobbies.forEach((l) => {
      const container = document.createElement("div");
      container.classList.add("single-lobby-container");
      const name = document.createElement("p");
      name.innerText = l.gameName;
      const creator = document.createElement("i");
      creator.innerText = l.player1.username;
      const status = document.createElement("span");
      status.innerText = `${l.player2 === null ? 1 : 2}/2`;
      container.append(name, creator, status);
      container.onclick = () => {
        this.socket.emit("joinGame", l.gameName);
      };
      this.el.lobbyContainer.append(container);
    });
  },
  generateMessage(data) {
    const msg = document.createElement("p");
    msg.classList.add("msg");
    if (data.username === this.state.username) msg.classList.add("myMsg");
    msg.innerHTML = `<strong>${data.username}:</strong> ${data.msg}`;
    this.el.mainMenuMsgContainer.append(msg);
  },
};
