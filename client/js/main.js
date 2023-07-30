import { Menu } from "./menu.js";
import { Lobby } from "./lobby.js";
import { loginFromStorage } from "./storage.js";

const mainMenuContainer = document.getElementById("main-menu");
const lobbyContainer = document.getElementById("lobby-menu");
const gameContainer = document.getElementById("game-menu");

const user = await loginFromStorage();
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

Menu.init(socket, user.username);

socket.emit("login", user.username);

socket.on("successfulLogin", (data) => {
  Menu.el.username.innerText = user.username;
  Menu.generateLobbies(data.lobbies);
});

socket.on("successfulJoinGame", (joinedGame) => {
  game = joinedGame;
  Lobby.init(socket, user.username, joinedGame);
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
  lobbyContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
});
