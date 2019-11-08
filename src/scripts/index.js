/*
------ TODO -------
In no order.

#1 Change animation library to TWEEN

#2 Fix the bullet animation
    - tween.
    - maybe have travel duration as a property in turret

#3 Fix the levels.js file, make it look nice/ easy to change the variables.

#4 Invent more enemies, maybe change the structure of how different are created

#5 Invent more turrets. 

#6 Make shop

# Make turrets placable on map.

*/
import './../style.css'
import {
    Turret
} from './turret'

const _levels = require('./levels')
const _map = require('./map')

const tile_WALL = _map.getMap().tile
const ts = Math.floor(window.innerHeight / 16)

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

let cash = 100;
const domCash = document.getElementById('cash')
const btnPlay = document.getElementById('start')

domCash.innerHTML = cash;

btnPlay.addEventListener('click', startLevel)

let state = {
    map: _map.getMap().maze,
    enemies: [],
    turrets: [new Turret(2, 4)],
    toSpawn: [],
    clock: 0,
    level: 0,
};

function startLevel() {

    state.level++
    let nextLvl = '';
    switch (state.level) {
        case 1:
            nextLvl = 'one'
            break;
        case 2:
            nextLvl = 'two'
            break
    }

    state.toSpawn = _levels.getLevels()[nextLvl].enemies
    btnPlay.disabled = true;
}

function getState(oldState) {
    const state = {
        ...oldState
    };

    state.toSpawn.forEach(e => {
        if (e.spawnTimer > e.spawnFrequency) {
            if (e.toSpawn.length > 0) {
                state.enemies.push(
                    e.toSpawn.pop()
                );
                e.spawnTimer = 0;
            }
        } else {
            e.spawnTimer += window.performance.now() - state.clock;
        }
    })

    for (let i = 0; i < state.enemies.length; i++) {
        const enemy = state.enemies[i];

        if (enemy.moveTimer > enemy.speed) {
            enemy.step++
            if (enemy.step < enemy.path.length - 1) {
                let dx = enemy.path[enemy.step].x - enemy.position.x
                let dy = enemy.path[enemy.step].y - enemy.position.y

                /* --------------------------------------------------------------------- #1 */
                anime({
                    targets: enemy.position,
                    x: enemy.position.x + dx,
                    y: enemy.position.y + dy,
                    duration: enemy.speed - 1,
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

    state.enemies = state.enemies.filter(e => e.isAlive)

    for (let i = 0; i < state.turrets.length; i++) {
        const turret = state.turrets[i];

        if (!turret.target && state.enemies.length > 0) {
            turret.target = state.enemies[0];
        }
        if (turret.target && !turret.target.isAlive) {
            turret.target = null
        }

        if (turret.shootTimer > turret.speed && turret.target) {
            turret.target.health -= turret.damage;
            turret.target.isHit = true;
            turret.fired = true

            /* --------------------------------------------------------------------- #1 */
            /* --------------------------------------------------------------------- #2 */
            setTimeout(() => {
                turret.fired = false
                turret.bullet.position = {
                    ...turret.position
                }
            }, 300)

            if (turret.target.health <= 0) {
                turret.target.isAlive = false;

                cash += turret.target.cash
                domCash.innerHTML = cash
                turret.target = null
            }
            turret.shootTimer = 0;
        } else {
            turret.shootTimer += window.performance.now() - state.clock;
        }
    }

    state.enemies = state.enemies.filter(e => e.isAlive)
    if (!state.enemies.length) {

        btnPlay.disabled = false
    }
    state.clock = window.performance.now();

    return state;
}

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
        context.drawImage(enemy.image, enemy.position.x * ts, enemy.position.y * ts, ts, ts);
    }


    for (let i = 0; i < state.turrets.length; i++) {
        const turret = state.turrets[i];
        context.drawImage(turret.image, turret.position.x * ts + 3, turret.position.y * ts + 3, ts * 0.9, ts * 0.9);


        /* --------------------------------------------------------------------- #2 */
        if (turret.fired) {
            context.drawImage(turret.bullet, turret.bullet.position.x * ts, turret.bullet.position.y * ts, ts * 0.5, ts * 0.5);
            if (turret.target) {
                anime({
                    targets: turret.bullet.position,
                    x: turret.target.position.x,
                    y: turret.target.position.y,
                    duration: 200,
                    easing: 'linear',
                });
            }
        }
    }

    window.requestAnimationFrame(render);
}

render();