import { Menu } from "./menu.js";
import { Lobby } from "./lobby.js";
import { Game } from "./game.js";
import { loginFromStorage, checkGame } from "./storage.js";

const mainMenuContainer = document.getElementById("main-menu");
const lobbyContainer = document.getElementById("lobby-menu");
const gameContainer = document.getElementById("game-menu");
const loadingModal = document.getElementById("loading-modal");

loadingModal.showModal();

const username = await loginFromStorage();
const gameName = checkGame();

let game = {};

const socket = io();

const inputs = document.querySelectorAll("input[type=text]");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputs[i].nextElementSibling.click();
    }
  });
}

if (gameName) {
  socket.emit("rejoinGame", { username, gameName });
} else {
  socket.emit("login", username);
}

socket.on("failedRejoinGame", () => {
  sessionStorage.removeItem("gameName");
  socket.emit("login", username);
});

socket.on("successfulRejoinGame", (rejoinedGame) => {
  game = rejoinedGame;
  loadingModal.close();
  gameContainer.classList.remove("hidden");
  Game.init(username, rejoinedGame);
});

socket.on("successfulLogin", (data) => {
  Menu.init(socket, username);
  Menu.el.username.innerText = username;
  Menu.generateLobbies(data.lobbies);
  loadingModal.close();
  mainMenuContainer.classList.remove("hidden");
});

socket.on("successfulJoinGame", (joinedGame) => {
  game = joinedGame;
  Lobby.init(socket, username, joinedGame);
  mainMenuContainer.classList.add("hidden");
  lobbyContainer.classList.remove("hidden");
});

socket.on("deletedLobby", (lobbies) => {
  console.log(lobbies);
  alert("The host has left the game.");
  lobbyContainer.classList.add("hidden");
  mainMenuContainer.classList.remove("hidden");
  socket.emit("joinMainLobby", game.gameName);
  Menu.generateLobbies(lobbies);
  game = {};
});

Lobby.el.backBtn.onclick = () => {
  lobbyContainer.classList.add("hidden");
  mainMenuContainer.classList.remove("hidden");
  socket.emit("leaveLobby", game.gameName);
  game = {};
};

socket.on("gameStarted", (startedGame) => {
  game = startedGame;
  sessionStorage.setItem("gameName", startedGame.gameName);
  lobbyContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  Game.init(username, startedGame);
});
