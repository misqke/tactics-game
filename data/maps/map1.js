const { Map } = require("../../models/maps.js");

const solids = [
  { x: 7, y: 7 },
  { x: 7, y: 8 },
  { x: 8, y: 7 },
  { x: 8, y: 8 },
];

const map1 = new Map("Map 1", 16, solids);

module.exports = map1;
