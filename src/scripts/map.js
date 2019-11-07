const astar = require('./astar');

const mapString = `
xxxxxxxxxxxxxxxx
x-x-------x----x
x-x--x----x----x
x-x--x----x----x
x-x--x----x----x
x-x--x----x----x
x-x--x----x----x
x-x--x----x-x--x
x-x--xx--xx-x-xx
x-x--x---x--x--x
x-x--x---x--x--x
x----x---x--x--x
x----x---x-xxx-x
x----x---x-x---x
x----x-----x---x
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

map.path = astar.getPath(
  map.maze, {
    x: 1,
    y: 1
  }, {
    x: 14,
    y: 14,
  }
);
map.spawn = {
  x: 1,
  y: 1,
}

map.end = {
  x: 14,
  y: 14,
}

function getMap() {
  return map;
}

module.exports = {
  getMap: getMap
};