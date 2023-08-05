import { GameSquare } from "./classes/gameSquare.js";

const SIZE = 64;
const DIMS = 16;
const PADDING = 20;

const gameWindowWidth = document.getElementById("game-window").offsetWidth;

export const Game = {
  el: {
    game: document.getElementById("game-canvas"),
    gameWindow: document.getElementById("game-window"),
  },
  state: {
    username: "",
    ctx: null,
    game: null,
    squares: [],
    init: false,
    board: {
      scale: 1,
    },
  },
  init(username, game) {
    this.state.username = username;
    this.state.game = game;
    this.el.game.height = SIZE * DIMS;
    this.el.game.width = SIZE * DIMS;
    this.state.ctx = this.el.game.getContext("2d");
    // create game board
    for (let y = 0; y < DIMS; y++) {
      for (let x = 0; x < DIMS; x++) {
        this.state.squares.push(
          new GameSquare(
            x * SIZE * this.state.board.scale,
            y * SIZE * this.state.board.scale,
            SIZE,
            this.state.ctx
          )
        );
      }
    }
    // scroll to starting pos
    this.el.gameWindow.scrollTo(
      this.el.game.width / 4,
      this.el.game.height / 4
    );

    this.drawBoard();
    if (this.state.init === false) {
      // canvas event listeners
      this.el.game.addEventListener("mousemove", (e) => {
        if (e.buttons === 1) {
          this.el.gameWindow.scrollBy(e.movementX * -1.25, e.movementY * -1.25);
        } else {
        }
      });
      this.el.game.addEventListener("wheel", (e) => {
        const dir = e.deltaY >= 0 ? -1 : 1;
        if (dir === 1) {
          if (this.state.board.scale < 1.7) {
            this.state.board.scale += 0.1;
          }
        } else {
          if (this.state.board.scale > 0.7) {
            this.state.board.scale -= 0.1;
          }
        }
        this.el.game.width = SIZE * this.state.board.scale * DIMS;
        this.el.game.height = SIZE * this.state.board.scale * DIMS;
        this.drawBoard();
      });
    }
    this.state.init = true;
  },
  drawBoard() {
    this.state.ctx.clearRect(0, 0, this.el.game.width, this.el.game.height);

    this.state.squares.forEach((s) => {
      s.draw(this.state.board.scale);
    });
  },
};
