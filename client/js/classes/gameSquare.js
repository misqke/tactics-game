export class GameSquare {
  constructor(x, y, posX, posY, size, ctx, solid) {
    this.x = x;
    this.y = y;
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.ctx = ctx;
    this.solid = solid;
    this.fill = solid === true ? "#898989" : "transparent";
    this.outline = "#898989";
  }
  draw(scale) {
    this.ctx.strokeStyle = this.outline;
    this.ctx.fillStyle = this.fill;
    this.ctx.fillRect(
      this.posX * scale,
      this.posY * scale,
      this.size * scale,
      this.size * scale
    );
    this.ctx.strokeRect(
      this.posX * scale,
      this.posY * scale,
      this.size * scale,
      this.size * scale
    );
  }
  handleHover(scale, offsetX, offsetY) {
    if (this.solid === false) {
      if (
        this.posX * scale <= offsetX &&
        this.posX * scale + this.size * scale > offsetX &&
        this.posY * scale <= offsetY &&
        this.posY * scale + this.size * scale > offsetY
      ) {
        this.fill = "#333";
      } else {
        this.fill = "transparent";
      }
    }
  }
}
