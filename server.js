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
  const newUser = state.addUser(socket.id);
  socket.emit("login", { user: newUser });
  socket.join("mainLobby");

  socket.on("disconnect", (reason) => {
    state.removeUser(socket.id);
  });

  socket.on("createGame", (data) => {
    const newLobby = state.addLobby(data);
    io.to("mainLobby").emit("lobbiesUpdate", state.lobbies);
  });

  socket.on("createMainMenuMsg", (data) => {
    io.to("mainLobby").emit("newMainMenuMsg", data);
  });
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
