const UnitBase = require("./unitBase.js");

class Game {
  constructor(data) {
    this.gameName = data.gameName;
    this.started = false;
    this.player1 = {
      username: data.player1,
      team: "Human",
    };
    this.player2 = null;
    this.map = "Map 1";
    this.units = [];
  }
  getUnits(player1Unit, player2Unit) {
    const player1 = {
      name: player1Unit.name,
      hp: player1Unit.hp,
      energy: player1Unit.energy,
      x: 7,
      y: 15,
      player: 1,
    };
    const player2 = {
      name: player2Unit.name,
      hp: player2Unit.hp,
      energy: player2Unit.energy,
      x: 7,
      y: 0,
      player: 2,
    };
    this.units.push(new UnitBase(player1));
    this.units.push(new UnitBase(player2));
  }
}

module.exports = Game;
