import { GameSquare } from "./classes/gameSquare.js";
import Unit from "./classes/unit.js";

const SIZE = 36;

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
    units: [],
    scale: 1.5,
  },
  init(username, game) {
    console.log(game);
    this.state.username = username;
    this.state.game = game;
    this.el.game.height = SIZE * this.state.game.map.dims * this.state.scale;
    this.el.game.width = SIZE * this.state.game.map.dims * this.state.scale;
    this.state.ctx = this.el.game.getContext("2d");
    // create game board

    // scroll to starting pos
    this.el.gameWindow.scrollTo(
      this.el.game.width / 4,
      this.el.game.height / 4
    );

    this.createBoard();
    this.run();
    if (this.state.init === false) {
      // canvas event listeners
      this.el.game.addEventListener("mousemove", (e) => {
        if (e.buttons === 1) {
          this.el.gameWindow.scrollBy(e.movementX * -1.25, e.movementY * -1.25);
        } else {
          this.state.squares.forEach((s) => {
            s.handleHover(this.state.scale, e.offsetX, e.offsetY);
          });
        }
      });
      this.el.game.addEventListener("mouseleave", (e) => {
        this.state.squares.forEach((s) => {
          if (s.solid === false) s.fill = "transparent";
        });
      });
      this.el.game.addEventListener("wheel", (e) => {
        const dir = e.deltaY >= 0 ? -1 : 1;
        if (dir === 1) {
          if (this.state.scale < 2.5) {
            this.state.scale += 0.1;
          }
        } else {
          if (this.state.scale > 1) {
            this.state.scale -= 0.1;
          }
        }
        this.el.game.width = SIZE * this.state.scale * this.state.game.map.dims;
        this.el.game.height =
          SIZE * this.state.scale * this.state.game.map.dims;
      });
    }
    this.state.init = true;
  },
  createBoard() {
    this.state.game.map.tiles.forEach((t) => {
      this.state.squares.push(
        new GameSquare(
          t.posX,
          t.posY,
          t.posX * SIZE,
          t.posY * SIZE,
          SIZE,
          this.state.ctx,
          t.solid
        )
      );
    });
    this.state.game.units.forEach((u) => {
      this.state.units.push(
        new Unit({
          ...u,
          ctx: this.state.ctx,
        })
      );
    });
  },
  run() {
    this.state.ctx.clearRect(0, 0, this.el.game.width, this.el.game.height);
    this.state.squares.forEach((s) => {
      s.draw(this.state.scale);
    });
    this.state.units.forEach((u) => {
      u.draw(this.state.scale);
    });
    requestAnimationFrame(() => this.run());
  },
};
