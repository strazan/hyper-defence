const astar = require('./astar');
let enemies = [];
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
let path;
const map = mapString
  .split('\n')
  .filter(row => row)
  .map(row => {
    return row.split('').map(col => (col === 'x' ? 1 : 0));
  });

path = astar.getPath(
  map,
  {
    x: 1,
    y: 1
  },
  {
    x: 6,
    y: 7
  }
);

function enemyMove(e) {
  e.counter++;

  let pos;
  if (e.counter < e.path.length - 1) {
    pos = e.path[e.counter];
  } else {
    pos = e.path[e.path.length - 1];
  }
  if (e.counter === e.path.length - 1) {
    map[pos.y][pos.x] = 0;
    clearInterval(enemyMove);
  }

  if (e.counter !== 0 && e.counter <= e.path.length) {
    let pPos = e.path[e.counter - 1];
    map[pPos.y][pPos.x] = 0;
  }
  if (e.counter === e.path.length) {
    map[pos.y][pos.x] = 0;
    enemies.slice(enemies.indexOf(e), enemies.indexOf(e) + 1);
    console.log(enemies.indexOf(e));
  } else {
    map[pos.y][pos.x] = 2;
  }
}

function getMap() {
  return map;
}

for (let i = 0; i < 100; i++) {
  enemies.push({
    path: path,
    counter: 0
  });
}

let index = 0;
setInterval(() => {
  let enemy = enemies[index];
  setInterval(() => {
    enemyMove(enemy);
  }, 500);
  index++;
}, 2000);

module.exports = {
    getMap: getMap
}
