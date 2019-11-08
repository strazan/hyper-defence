// import './../style.css'
// import {
//   Enemy
// } from './enemy'
// import * as p5 from './../scripts/p5.min'


// const tileWidth = Math.floor(window.innerHeight / 16)
// const tileHeight = Math.floor(window.innerHeight / 16)
// const ts = Math.floor(window.innerHeight / 16)
// const _map = require('./map')

// let map = _map.getMap().maze
// let path = _map.getMap().path
// let sketch;
// let spawn = _map.getMap().spawn
// let e;


// let enemies = []
// let s = (sk) => {
//   sk.setup = () => {
//     sk.stroke(255)
//     sketch = sk;
//     var div = document.getElementById('canvas-holder')
//     let canvas = sk.createCanvas(window.innerHeight, window.innerHeight)
//     canvas.parent(div)
//     drawMap(map, sk)
//     setInterval(() => {
//       enemies.push(new Enemy(ts * spawn.x, spawn.y * ts, path, ts, sk))
//     }, 2000);
//   }

//   sk.draw = () => {
//     drawMap(map, sk)
//     enemies.forEach(e => {
//       e.steer()
//       e.move()
//     })


//   }
// }

// function drawMap(map, sk) {
//   map.forEach((row, y) => {
//     row.forEach((tile, x) => {
//       switch (tile) {
//         case 0:
//           sk.fill(255);
//           break;
//         case 1:
//           sk.fill(0);
//           break;
//         case 2:
//           sk.fill(100);
//           break;
//       }
//       sk.rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
//     });
//   });
// }

// function p5draw(sk) {

// }

// const P5 = new p5(s);