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
            toSpawn: []
        }]
    },
    two: {
        enemies: [{
            type: 'weak',
            spawnFrequency: 2000,
            spawnTimer: 0,
            toSpawn: []
        },
        {
            type: 'fed',
            spawnFrequency: 3000,
            spawnTimer: 2000,
            toSpawn: []
        }]
    }
}


////// MAKE BETTER xD 
loadLevel('one', [{
    type: 'bd',
    amount: 10,
}])

loadLevel('two', [{
    type: 'bd',
    amount: 13,
}])
// , {
//     type: 'fed',
//     amount: 5,
// }])

for (let i = 0; i < 5; i++) {
    let enemy = new Enemy(1, 1, path)
    enemy.loadFromTemplate('fed')
    levels.two.enemies[1].toSpawn.push(enemy)
}

function loadLevel(lvl, enemies) {

    enemies.forEach(e => {
        for (let i = 0; i < e.amount; i++) {
            let enemy = new Enemy(1, 1, path)
            enemy.loadFromTemplate(e.type)
            levels[lvl].enemies[0].toSpawn.push(enemy)
        }
    })

}

export function getLevels() {
    return levels
}