const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
const state = require("./state.js");
const authRouter = require("./routs/authRouter.js");

const PORT = process.env.PORT || 9000;

/** SERVER */
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

/** MIDDLEWARE */
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/auth", authRouter);

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("login", (username) => {
    socket.data.username = username;
    socket.emit("successfulLogin", {
      lobbies: state.games.filter((g) => g.started === false),
    });
    socket.join("mainLobby");
  });

  socket.on("disconnect", (reason) => {});

  socket.on("createGame", (gameName) => {
    const newGame = state.addGame({
      player1: socket.data.username,
      gameName,
    });
    if (newGame.error === true) {
      socket.emit("failedCreateGame", newGame);
    } else {
      socket.emit("successfulJoinGame", newGame);
      socket.leave("mainLobby");
      socket.join(newGame.gameName);
      io.to("mainLobby").emit(
        "lobbiesUpdate",
        state.games.filter((g) => g.started === false)
      );
    }
  });

  socket.on("createMainMenuMsg", (msg) => {
    io.to("mainLobby").emit("newMainMenuMsg", {
      username: socket.data.username,
      msg,
    });
  });
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
