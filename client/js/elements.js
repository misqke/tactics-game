const el = {
  mainMenu: document.getElementById("main-menu"),
  lobbyMenu: document.getElementById("lobby-menu"),
  gameMenu: document.getElementById("game-menu"),
  username: document.getElementById("username"),
  newGameInput: document.getElementById("new-game-name-input"),
  newGameButton: document.getElementById("new-game-button"),
  lobbyContainer: document.getElementById("main-menu-lobby-grid"),
  generateLobbies(lobbies) {
    this.lobbyContainer.innerHTML = "";
    lobbies.forEach((l) => {
      const container = document.createElement("div");
      container.classList.add("single-lobby-container");
      const name = document.createElement("p");
      name.innerText = l.gameName;
      const creator = document.createElement("i");
      creator.innerText = l.player1.name;
      container.append(name, creator);
      this.lobbyContainer.append(container);
    });
  },
};

export default el;
