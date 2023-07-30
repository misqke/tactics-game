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
  socket.join("mainLobby");
  socket.data.lobby = "mainLobby";

  socket.on("login", (username) => {
    socket.data.username = username;
    socket.emit("successfulLogin", {
      lobbies: state.getLobbies(),
    });
  });

  socket.on("disconnecting", (reason) => {
    if (socket.data.lobby !== "mainLobby") {
      res = state.leaveGame(socket.data.lobby, socket.data.username);
      if (res.deleted === true) {
        io.to(socket.data.lobby).emit("deletedLobby", {
          lobbies: state.getLobbies(),
        });
        // io.to("mainLobby").emit("lobbiesUpdate", state.getLobbies());
      } else {
        io.to(socket.data.lobby).emit("updateGameLobby", res.game);
      }
    }
  });

  socket.on("disconnect", (reason) => {});

  /** main menu */
  socket.on("joinMainLobby", (currentLobby) => {
    socket.leave(currentLobby);
    socket.join("mainLobby");
    socket.data.lobby = "mainLobby";
  });

  socket.on("createMainMenuMsg", (msg) => {
    io.to("mainLobby").emit("newMainMenuMsg", {
      username: socket.data.username,
      msg,
    });
  });

  socket.on("createGame", (gameName) => {
    const res = state.addGame({
      player1: socket.data.username,
      gameName,
    });
    if (res.error === true) {
      socket.emit("failedCreateGame", res);
    } else {
      socket.emit("successfulJoinGame", res.game);
      socket.leave("mainLobby");
      socket.join(res.game.gameName);
      socket.data.lobby = res.game.gameName;
      io.to("mainLobby").emit("lobbiesUpdate", state.getLobbies());
    }
  });

  socket.on("joinGame", (gameName) => {
    const res = state.joinGame(gameName, socket.data.username);
    if (res.error === true) {
      socket.emit("failedJoinGame", {
        msg: res.msg,
        lobbies: state.getLobbies(),
      });
    } else {
      socket.emit("successfulJoinGame", res.game);
      io.to(res.game.gameName).emit("updateGameLobby", res.game);
      socket.leave("mainLobby");
      socket.join(res.game.gameName);
      socket.data.lobby = res.game.gameName;
    }
  });

  /** Lobby */
  socket.on("createLobbyMsg", (data) => {
    io.to(data.gameName).emit("newLobbyMsg", {
      username: socket.data.username,
      msg: data.msg,
    });
  });

  socket.on("leaveLobby", (gameName) => {
    const username = socket.data.username;
    const res = state.leaveGame(gameName, username);
    if (res.deleted === true) {
      socket.leave(gameName);
      socket.join("mainLobby");
      socket.data.lobby = "mainLobby";
      io.to(gameName).emit("deletedLobby", state.getLobbies());
    } else {
      socket.leave(gameName);
      socket.join("mainLobby");
      socket.data.lobby = "mainLobby";
      io.to(gameName).emit("updateGameLobby", res.game);
    }
  });

  socket.on("updateGameLobbyInfo", (game) => {
    const updated = state.updateGameLobby(game);
    socket.broadcast.to(socket.data.lobby).emit("updateGameLobby", updated);
  });

  socket.on("startGame", (game) => {
    const updatedGame = state.startGame(game);
    io.to(socket.data.lobby).emit("gameStarted", updatedGame);
  });
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
