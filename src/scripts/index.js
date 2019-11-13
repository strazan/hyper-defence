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

// Kinda done #7 Make turrets placable on map.

#8 Make turrets target first in map not first in array, also switch target if any enemy passes.

#9 Make turrets have radius

#10 rename all to either turrets or towers ffs.

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
const butTurrBtn = document.getElementById('buy-turret')
const context = canvas.getContext('2d');
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

let cash = 100;
let lives = 100
const domCash = document.getElementById('cash')
const domLives = document.getElementById('lives')

const btnPlay = document.getElementById('start')
let buyingTurr = false;
let mousePos = {}

domCash.innerHTML = cash;
domLives.innerHTML = lives;

btnPlay.addEventListener('click', startLevel)

butTurrBtn.addEventListener('click', buyNewTurret)

let state = {
    map: _map.getMap().maze,
    enemies: [],
    turrets: [],
    toSpawn: [],
    clock: 0,
    level: 0,
};

function buyNewTurret() {
    buyingTurr = true
    window.addEventListener('mousemove', evt => {
        mousePos = getMousePos(canvas, evt)
    })
    canvas.addEventListener('click', () => {
        if (buyingTurr && canPlaceTower(getTilePos(mousePos))) {
            placeNewTower(getTilePos(mousePos))
            buyingTurr = false
        }
    })
}

function startLevel() {

    state.level++
    let nextLvl = '';
    switch (state.level) {
        case 1:
            nextLvl = 'one'
            break;
        case 2:
            nextLvl = 'two'
            break;
        case 3:
            nextLvl = 'three'
            break;
    }

    state.toSpawn = _levels.getLevels()[nextLvl].enemies
    btnPlay.disabled = true;
}

function canPlaceTower(pos) {
    return state.map[pos.y][pos.x] === 1 && !(state.turrets.some(t => {
        t.position.x !== pos.x && t.position.y !== pos.y
    })) && cash >= 100
}

function placeNewTower(pos) {
    state.turrets.push(new Turret(pos.x, pos.y))
    cash -= 100
    domCash.innerHTML = cash;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getTilePos(mPos) {
    return {
        x: Math.floor(mPos.x / ts),
        y: Math.floor(mPos.y / ts)
    }
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
                lives--;
                domLives.innerHTML = lives;
                enemy.isAlive = false;

            }
        } else {
            enemy.moveTimer += window.performance.now() - state.clock;
        }
    }

    state.enemies = state.enemies.filter(e => e.isAlive)

    for (let i = 0; i < state.turrets.length; i++) {
        const turret = state.turrets[i];

        /* --------------------------------------------------------------------- #8 */
        if (!turret.target && state.enemies.length > 0) {
            turret.target = state.enemies[0];
        }
        if (turret.target && !turret.target.isAlive) {
            turret.target = null
        }

        if (turret.shootTimer > turret.speed && turret.target) {

            turret.target.isHit = true;
            turret.fired = true


            turret.bullet.target = {
                ...turret.target.position
            }
            console.log(turret.bullet.target)


            /* --------------------------------------------------------------------- #1 */
            /* --------------------------------------------------------------------- #2 */
            setTimeout(() => {
                turret.target.health -= turret.damage;
                turret.fired = false


                if (turret.target.health <= 0) {
                    turret.target.isAlive = false;

                    cash += turret.target.cash
                    domCash.innerHTML = cash
                    turret.target = null
                }
            }, turret.bullet.travelSpeed)
            setTimeout(() => {
                turret.bullet.position = {
                    ...turret.position
                }
                turret.bullet.target = null
            }, turret.bullet.travelSpeed + 100)


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
        // if (turret.fired) {

        if (turret.bullet.target) {
            context.drawImage(turret.bullet, turret.bullet.position.x * ts, turret.bullet.position.y * ts, ts * 0.5, ts * 0.5);
            anime({
                targets: turret.bullet.position,
                x: turret.bullet.target.x,
                y: turret.bullet.target.y,
                duration: turret.bullet.travelSpeed - 130,
                easing: 'linear',
            });
        }
    }
    // }
    if (buyingTurr) {
        context.fillStyle = "#00000044";
        context.fillRect(mousePos.x - 200, mousePos.y - 200, 400, 400);
    }
    window.requestAnimationFrame(render);
}

render();