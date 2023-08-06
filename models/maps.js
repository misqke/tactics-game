class Map {
  constructor(name, dims, solids) {
    this.name = name;
    this.tiles = [];
    this.dims = dims;
    for (let x = 0; x < dims; x++) {
      for (let y = 0; y < dims; y++) {
        let solid = false;
        const isSolid = solids.find((u) => u.x === x && u.y === y);
        if (isSolid !== undefined) solid = true;
        this.tiles.push(new Tile(x, y, solid));
      }
    }
  }
}

class Tile {
  constructor(posX, posY, solid) {
    this.posX = posX;
    this.posY = posY;
    this.solid = solid;
  }
}

module.exports = { Map };
