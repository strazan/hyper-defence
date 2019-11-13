import {
    Enemy
} from './enemy'

let _map = require('./map')
let path = _map.getAstarPath()

 /* --------------------------------------------------------------------- #3 */
let levels = {
    one: {
        enemies: [{
            type: 'weak',
            spawnFrequency: 800,
            spawnTimer: 0,
            toSpawn: load('weak', 30)
        }]
    },
    two: {
        enemies: [{
            type: 'weak',
            spawnFrequency: 2000,
            spawnTimer: 0,
            toSpawn: load('weak', 20)
        },
        {
            type: 'medium',
            spawnFrequency: 3000,
            spawnTimer: -5000,
            toSpawn: load('medium', 15)
        }]
    },
    three: {
        enemies: [{
            type: 'weak',
            spawnFrequency: 2000,
            spawnTimer: 0,
            toSpawn: load('weak', 20)
        },
        {
            type: 'medium',
            spawnFrequency: 2000,
            spawnTimer: 1000,
            toSpawn: load('medium', 35)
        }]
    }
}

function load(type, amount){
    let enemies = []
    for (let i = 0; i < amount; i++) {
        let enemy = new Enemy(1, 1, path)
        enemy.loadFromTemplate(type)
        enemies.push(enemy)
    }
    return enemies

}

export function getLevels() {
    return levels
}