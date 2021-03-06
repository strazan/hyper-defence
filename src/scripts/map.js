const astar = require('./astar');

const mapString = `
xxxxxxxxxxxxxxxx
x-x------------x
x-x-xxxxxxxxxx-x
x-x-x--------x-x
x-x-x-xxxxxx-x-x
x-x-x-x----x-x-x
x-x-x-x-xx-x-x-x
x-x-x-x--x-x-x-x
x-x-x-x--x-x-x-x
x-x-x-xxxx-x-x-x
x-x-x------x-x-x
x-x-xxxxxxxx-x-x
x-x----------x-x
x-xxxxxxxxxxxx-x
x--------------x
xxxxxxxxxxxxxxxx
`;
// Convert into array matrix

let map = {};

map.maze = mapString
  .split('\n')
  .filter(row => row)
  .map(row => {
    return row.split('').map(col => (col === 'x' ? 1 : 0));
  });

map.spawn = {
  x: 1,
  y: 1,
}

map.end = {
  x: 8,
  y: 8,
}

map.path = astar.getPath(
  map.maze, map.spawn, map.end
);

const tile = new Image(100,100)
tile.src = ('../media/images/glowing-box.svg')

map.tile = tile


function getMap() {
  return map;
}

function getAstarPath() {
  return map.path.map(o => {
    return {
      x: o.x,
      y: o.y
    }
  })
}

module.exports = {
  getMap: getMap,
  getAstarPath: getAstarPath

};