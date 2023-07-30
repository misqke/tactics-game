import { Menu } from "./menu.js";
import { Lobby } from "./lobby.js";
import { loginFromStorage } from "./storage.js";

const mainMenuContainer = document.getElementById("main-menu");
const lobbyContainer = document.getElementById("lobby-menu");
const gameContainer = document.getElementById("game-menu");

const user = await loginFromStorage();
let game = {};

const socket = io();

socket.emit("login", user.username);

socket.on("successfulLogin", (data) => {
  console.log(data);
  Menu.el.username.innerText = user.username;
  Menu.generateLobbies(data.lobbies);
});

Menu.init(socket, user.username);

const inputs = document.querySelectorAll("input[type=text]");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputs[i].nextElementSibling.click();
    }
  });
}

socket.on("successfulJoinGame", (joinedGame) => {
  console.log(joinedGame);
  game = joinedGame;
  Lobby.init(socket, username, joinedGame);
  mainMenuContainer.classList.add("hidden");
  lobbyContainer.classList.remove("hidden");
});
