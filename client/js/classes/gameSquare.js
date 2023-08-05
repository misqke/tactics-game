export class GameSquare {
  constructor(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
  }
  draw(scale) {
    this.ctx.strokeStyle = "#898989";
    this.ctx.strokeRect(
      this.x * scale,
      this.y * scale,
      this.size * scale,
      this.size * scale
    );
  }
}
