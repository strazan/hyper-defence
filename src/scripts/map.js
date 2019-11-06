const astar = require('./astar');

const mapString = `
xxxxxxxxxxxxxxxx
x----x---------x
x----x----x----x
x----x----x----x
x----x----x----x
x----x----x----x
x----x----x----x
x----x----x----x
x----xxxxxx--xxx
x--------------x
x--------------x
x----x---------x
x----x---------x
x----x---------x
x----x---------x
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
    x: 6,
    y: 7
  }
);
map.spawn = {
  x: 1,
  y: 1,
}

map.end = {
  x: 6,
  y: 7,
}

function getMap() {
  return map;
}

module.exports = {
  getMap: getMap
};