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
            spawnFrequency: 2000,
            spawnTimer: 0,
            //CHANGE AMPUT
            toSpawn: load('weak', 20)
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
            }
        ]
    },
    three: {
        enemies: [{
                type: 'weak',
                spawnFrequency: 2000,
                spawnTimer: -3000,
                toSpawn: load('weak', 20)
            },
            {
                type: 'medium',
                spawnFrequency: 2000,
                spawnTimer: 1000,
                toSpawn: load('medium', 35)
            },
            {
                type: 'hard',
                spawnFrequency: 2500,
                spawnTimer: -10000,
                toSpawn: load('hard', 20)
            }
        ]
    },
    four: {
        enemies: [{
                type: 'weak',
                spawnFrequency: 1000,
                spawnTimer: -25000,
                toSpawn: load('weak', 10)
            },
            {
                type: 'medium',
                spawnFrequency: 5000,
                spawnTimer: 1000,
                toSpawn: load('medium', 8)
            },
            {
                type: 'medium',
                spawnFrequency: 300,
                spawnTimer: -1500,
                toSpawn: load('medium', 10)
            },
            {
                type: 'hard',
                spawnFrequency: 1500,
                spawnTimer: 1000,
                toSpawn: load('hard', 35)
            }
        ]
    },
    four: {
        enemies: [{
                type: 'weak',
                spawnFrequency: 100,
                spawnTimer: 0,
                toSpawn: load('weak', 50)
            },
            {
                type: 'weak',
                spawnFrequency: 100,
                spawnTimer: -8000,
                toSpawn: load('weak', 50)
            },
            {
                type: 'weak',
                spawnFrequency: 100,
                spawnTimer: -16000,
                toSpawn: load('weak', 50)
            },
            {
                type: 'medium',
                spawnFrequency: 2000,
                spawnTimer: 1000,
                toSpawn: load('medium', 30)
            }
        ]
    }
}

function load(type, amount) {
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