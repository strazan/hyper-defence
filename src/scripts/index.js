import './../style.css'
import {
    Enemy
} from './enemy'

const _map = require('./map')
const path = _map.getAstarPath()
console.log(_map.getAstarPath())
const tile_WALL = _map.getMap().tile
const tileWidth = Math.floor(window.innerHeight / 16)
const tileHeight = Math.floor(window.innerHeight / 16)
const ts = Math.floor(window.innerHeight / 16)

let state = {
    map: _map.getMap().maze,
    enemies: [],
    turrets: [{
        position: {
            x: 2,
            y: 4,
        },
        shootTimer: 0,
    }, {
        position: {
            x: 2,
            y: 6,
        },
        shootTimer: 0,
    }],
    spawnTimer: 0,
    clock: 0,
};

function getState(oldState) {
    const state = {
        ...oldState
    };

    if (state.spawnTimer > 2000) {
        state.enemies.push(
            new Enemy(1, 1, path)

        );
        state.spawnTimer = 0;
    } else {
        state.spawnTimer += window.performance.now() - state.clock;
    }

    for (let i = 0; i < state.enemies.length; i++) {
        const enemy = state.enemies[i];
        if (enemy.moveTimer > 500) {
            enemy.step++
            if (enemy.step < enemy.path.length - 1) {
                // enemy.position.x += 1;
                let dx = enemy.path[enemy.step].x - enemy.position.x
                let dy = enemy.path[enemy.step].y - enemy.position.y
                anime({
                    targets: enemy.position,
                    x: enemy.position.x + dx,
                    y: enemy.position.y + dy,
                    duration: 499,
                    easing: 'linear',
                });

                enemy.moveTimer = 0;
            } else {
                enemy.isAlive = false;
            }
        } else {
            enemy.moveTimer += window.performance.now() - state.clock;
        }
    }

    for (let i = 0; i < state.turrets.length; i++) {
        const turret = state.turrets[i];

        if (!turret.target) {
            turret.target = state.enemies[0];
        }

        if (turret.shootTimer > 500 && turret.target) {
            turret.target.health -= 10;
            if (turret.target.health <= 0) {
                // state.enemies.shift();

                state.enemies[(state.enemies.indexOf(turret.target))].isAlive = false;
               
            }
            turret.shootTimer = 0;
        } else {
            turret.shootTimer += window.performance.now() - state.clock;
        }
    }
    state.enemies = state.enemies.filter(e => e.isAlive)
    state.clock = window.performance.now();

    return state;
}

const canvas = document.getElementById('canvas');
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

canvas.onclick = e => {
    state.turrets.push({
        position: {
            x: 2,
            y: 10,
        },
        shootTimer: 0,
    });
};

function render() {
    const oldState = state;
    state = getState(state);

    context.clearRect(0, 0, canvas.width, canvas.height);

    state.map.forEach((row, y) => {
        row.forEach((tile, x) => {
            switch (tile) {
                case 0:
                    context.fillStyle = 'rgba(0,0,0,0)'
                    context.fillRect(x * ts, y * ts, ts, ts);
                    break;
                case 1:

                    context.drawImage(tile_WALL, x * ts, y * ts, ts, ts);
                    break;
                case 2:
                    context.fillStyle = 'salmon'
                    context.fillRect(x * ts, y * ts, ts, ts);
                    break;
            }

        })
    });

    for (let i = 0; i < state.enemies.length; i++) {
        const enemy = state.enemies[i];
        let image = new Image(ts, ts)
        image.src = '../media/images/enemies/student-blue.svg'
        // context.fillStyle = 'rgba(255, 0, 0, ' + enemy.health / 100 + ')';
        context.drawImage(image, enemy.position.x * ts, enemy.position.y * ts, ts, ts);
        // context.fillRect(enemy.position.x * ts, enemy.position.y * ts, ts, ts);
    }

    context.fillStyle = '#fff';
    for (let i = 0; i < state.turrets.length; i++) {
        const turret = state.turrets[i];

        if (turret.shootTimer > 500) {

        }

        context.fillRect(turret.position.x * ts, turret.position.y * ts, ts, ts);
    }

    window.requestAnimationFrame(render);
}

render();