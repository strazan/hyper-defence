import './../style.css';
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const tileWidth = Math.floor(window.innerWidth / 16);
const tileHeight = Math.floor(window.innerHeight / 16);
const main = require('./map')

console.log(main.getMap())
setInterval(() => {
  makePath(main.getMap())
}, 27);


function makePath(map) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      switch (tile) {
        case 0:
          context.fillStyle = '#fff';
          break;
        case 1:
          context.fillStyle = '#000';
          break;
        case 2:
          context.fillStyle = 'salmon';
          break;
      }
      context.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    });

  });
}
