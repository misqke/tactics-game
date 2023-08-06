class Unit {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.ctx = data.ctx;
    this.player = data.player;
    this.name = data.name;
    this.size = 36;
    this.posX = data.posX;
    this.posY = data.posY;
  }
  draw(scale) {
    this.ctx.fillStyle = this.player === 1 ? "#f00" : "#0f0";
    this.ctx.fillRect(
      this.posX * scale,
      this.posY * scale,
      this.size * scale,
      this.size * scale
    );
  }
}

export default Unit;
