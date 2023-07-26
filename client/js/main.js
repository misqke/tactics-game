import el from "./elements.js";
import state from "./state.js";
import { loginFromStorage } from "./storage.js";

loginFromStorage();

const socket = io();

socket.on("login", (data) => {
  state.user = data.user;
  el.username.innerText = data.user.name;
});

socket.on("lobbiesUpdate", (lobbies) => {
  console.log(lobbies);
  state.lobbies = lobbies;
  el.generateLobbies(state.lobbies);
});

socket.on("newMainMenuMsg", (data) => {
  el.generateMessage(data);
});

const inputs = document.querySelectorAll("input[type=text]");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputs[i].nextElementSibling.click();
    }
  });
}

el.newGameButton.onclick = () => {
  const gameName = el.newGameInput.value;
  socket.emit("createGame", { user: state.user, gameName });
};

el.mainMenuMsgButton.onclick = () => {
  const msg = el.mainMenuMsgInput.value;
  if (msg.length > 0) {
    socket.emit("createMainMenuMsg", { user: state.user, msg });
    el.mainMenuMsgInput.value = "";
  }
};
