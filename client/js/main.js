import el from "./elements.js";
import state from "./state.js";

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

el.newGameButton.onclick = () => {
  console.log("clicked");
  const gameName = el.newGameInput.value;
  socket.emit("createGame", { user: state.user, gameName });
};
