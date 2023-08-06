class UnitBase {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.player = data.player;
    this.name = data.name;
    this.size = 36;
    this.posX = data.x * this.size;
    this.posY = data.y * this.size;
    this.hp = data.hp;
    this.energy = data.energy;
  }
}

module.exports = UnitBase;
