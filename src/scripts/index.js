/*
------ TODO -------
In no order.

#1 Change animation library to TWEEN

#2 Fix the bullet animation
    - tween.
    - maybe have travel duration as a property in turret

#10 rename all to either turrets or towers ffs.

*/


/* FIX BEFORE JAM

    * text when every level is complete.
    * maybe display level.
    * some sort of win statement.

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
let animationFrame;

const turretInfo = document.getElementById('turret-info')
const buyPmOne = document.getElementById('turret-pm-one')
const buyPmTwo = document.getElementById('turret-pm-two')
const buyPmThree = document.getElementById('turret-pm-three')
const buyEskil = document.getElementById('turret-eskil')
const context = canvas.getContext('2d');
canvas.width = window.innerHeight - 16;
canvas.height = window.innerHeight - 16;

let cash = 100; // mpve to state
let lives = 42
const domCash = document.getElementById('cash')
const domLives = document.getElementById('lives')
const btnPlay = document.getElementById('start')
const domLevel = document.getElementById('level')
let buyingTurr = null;
let hoveredTurret = null;
let mousePos = {}

const backgroundSound = new Audio("media/sounds/gestures.wav")
backgroundSound.loop = true;
let isdeathSoundplaying = false;

function startSound() {
    backgroundSound.play();
}
domCash.innerHTML = cash;
domLives.innerHTML = lives;

btnPlay.addEventListener('click', startLevel)

buyPmOne.addEventListener('click', () => {
    buyNewTurret('pm-one')
})
buyPmTwo.addEventListener('click', () => {
    buyNewTurret('pm-two')
})
buyPmThree.addEventListener('click', () => {
    buyNewTurret('pm-three')
})
buyEskil.addEventListener('click', () => {
    buyNewTurret('eskil')
})

window.addEventListener('mousemove', e => {
    let hoveredTurrets = state.turrets.filter(t => {
        return t.position.x === getTilePos(getMousePos(canvas, e)).x && t.position.y === getTilePos(getMousePos(canvas, e)).y
    })

    if (hoveredTurrets.length === 0) {
        hoveredTurret = null
    } else {
        hoveredTurret = hoveredTurrets[0]
    }

})

let state = {
    map: _map.getMap().maze,
    enemies: [],
    turrets: [],
    toSpawn: [],
    clock: 0,
    level: 0,
};

function buyNewTurret(type) {

    buyingTurr = new Turret(0, 0)
    buyingTurr.loadFromTemplate(type)
    loadStoreInfo(buyingTurr)
    turretInfo.style.visibility = 'visible';
    window.addEventListener('mousemove', evt => {
        mousePos = getMousePos(canvas, evt)
    })
    canvas.addEventListener('click', () => {
        if (buyingTurr && canPlaceTower(getTilePos(mousePos), buyingTurr)) {
            placeNewTower(getTilePos(mousePos))
            buyingTurr = null
            turretInfo.style.visibility = 'hidden';
        } else {
            buyingTurr = null
            turretInfo.style.visibility = 'hidden';
        }
    })
}

function loadStoreInfo(turret) {
    let speed = ''
    switch (turret.name) {
        case 'pm-one':
            speed = 'Normal'
            break
        case 'pm-two':
            speed = 'Fast'
            break
        case 'pm-three':
            speed = 'Slow'
            break
        case 'eskil':
            speed = 'Very fast'
            break

    }
    document.getElementById('turret-info__damage').innerHTML = `${turret.damage}`
    document.getElementById('turret-info__speed').innerHTML = `${speed}`
    document.getElementById('turret-info__cost').innerHTML = `${turret.cost} xp`
}

function startLevel() {
    btnPlay.disabled = true;
    btnPlay.style.opacity = 0.3
    startSound();

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
        case 4:
            nextLvl = 'four'
            break;
        case 5:
            nextLvl = 'five'
            break;
        case 6:
            nextLvl = 'six'
            break;
        case 7:
            nextLvl = 'seven'
            break;
    }

    //change color of btn?
    domLevel.innerHTML = state.level;
    state.toSpawn = _levels.getLevels()[nextLvl].enemies
   
}

function playerLoose(){
    let txt = document.createTextNode('You Lost')
    let h1 = document.createElement('H1')
    h1.appendChild(txt)
    h1.classList.add('big-fat-text')
    document.body.appendChild(h1);
    window.cancelAnimationFrame(animationFrame);
    console.log(animationFrame)
}

function win() {
    let txt = document.createTextNode('You Won')
    let h1 = document.createElement('H1')
    h1.appendChild(txt)
    h1.classList.add('big-fat-text')
    document.body.appendChild(h1);
}

function canPlaceTower(pos, turret) {
    return state.map[pos.y][pos.x] === 1 &&
        !(state.turrets.some(t => {
            return t.position.x === pos.x && t.position.y === pos.y
        })) && cash >= turret.cost
}

function placeNewTower(pos) {
    buyingTurr.position = pos
    state.turrets.push(buyingTurr)
    cash -= buyingTurr.cost
    domCash.innerHTML = cash;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getTurretTarget(turret) {
    let target = null;
    let withinRadius = [];
    state.enemies.forEach(e => {
        let dX = turret.position.x - e.position.x
        let dY = turret.position.y - e.position.y
        let distance = Math.sqrt(dX * dX + dY * dY)
        if (distance <= turret.radius) {
            withinRadius.push(e)
            if (!target) {
                target = e
            }
            if (e.step > target.step) {
                target = e;
            }
        }
    })

    return target
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

    if(cash >= 1000){
        buyPmOne.style.opacity = 1
        buyPmTwo.style.opacity = 1
        buyPmThree.style.opacity = 1
        buyEskil.style.opacity = 1
    } else if(cash >= 200){
        buyPmOne.style.opacity = 1
        buyPmTwo.style.opacity = 1
        buyPmThree.style.opacity = 1
        buyEskil.style.opacity = 0.3
    } else if(cash >= 150){
        buyPmOne.style.opacity = 1
        buyPmTwo.style.opacity = 1
        buyPmThree.style.opacity = 0.3
        buyEskil.style.opacity = 0.3
    } else if(cash >= 100){
        buyPmOne.style.opacity = 1
        buyPmTwo.style.opacity = 0.3
        buyPmThree.style.opacity = 0.3
        buyEskil.style.opacity = 0.3
    } else{
        buyPmOne.style.opacity = 0.3
        buyPmTwo.style.opacity = 0.3
        buyPmThree.style.opacity = 0.3
        buyEskil.style.opacity = 0.3
    }

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
                lives -= enemy.hpDamage;
               
                enemy.isAlive = false;
                if(lives <= 0) {
                    playerLoose();
                    lives  = 0
                }
                domLives.innerHTML = lives;
            }
        } else {
            enemy.moveTimer += window.performance.now() - state.clock;
        }
    }

    state.enemies = state.enemies.filter(e => e.isAlive)

    for (let i = 0; i < state.turrets.length; i++) {
        const turret = state.turrets[i];

        /* --------------------------------------------------------------------- #8 */
        if (state.enemies.length > 0) {
            turret.target = getTurretTarget(turret);
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

            /* --------------------------------------------------------------------- #1 */
            /* --------------------------------------------------------------------- #2 */
            setTimeout(() => {
                turret.target.health -= turret.damage;
                turret.fired = false



                if (turret.target.health <= 0) {
                    turret.target.isAlive = false;
                    if (!isdeathSoundplaying) {

                        turret.target.deathSound.play()
                        isdeathSoundplaying = true;
                        setTimeout(() => {
                            isdeathSoundplaying = false;
                        }, 2000);
                    }

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
        if(state.level === 'seven'){
           win();
        }
        btnPlay.disabled = false
        btnPlay.style.opacity = 1
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
        // context.fillStyle = 'salmon'
        // context.fillRect(enemy.position.x * ts + ts/2, enemy.position.y * ts + ts, ts/2, 5)
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
    if (hoveredTurret) {
        context.beginPath();
        context.fillStyle = "#00000044";
        context.arc(hoveredTurret.position.x * ts + ts / 2, hoveredTurret.position.y * ts + ts / 2, hoveredTurret.radius * ts, 0, 2 * Math.PI);
        context.fill();
    }
    if (buyingTurr) {
        context.beginPath();
        context.fillStyle = "#00000044";
        context.arc(mousePos.x, mousePos.y, buyingTurr.radius * ts, 0, 2 * Math.PI);
        context.fill();
        // context.fillRect( - 200,  - 200, , 400);
    }
    animationFrame = window.requestAnimationFrame(render);
}

render();