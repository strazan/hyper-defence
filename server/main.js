const express = require('express')
const app = express()
const port = 3000
const astar = require('./astar');
let enemies = []
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
        return row
            .split('')
            .map(col => col === 'x' ? 1 : 0);
    });


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

path = astar.getPath(map, {
    x: 1,
    y: 1
}, {
    x: 6,
    y: 7,
})

let counter = 0

app.get('/game', (req, res) => res.send({
    map
}))

function enemyMove(e) {
    e.counter++
    let pos;
    if (e.counter < e.path.length - 1) {
        pos = e.path[e.counter]
    } else {
        pos = e.path[e.path.length - 1]
    }


    if (e.counter === e.path.length - 1) {
        map[pos.y][pos.x] = 0
        clearInterval(enemyMove)
    }

    if (e.counter !== 0) {
        let pPos = e.path[e.counter - 1]
        map[pPos.y][pPos.x] = 0
    }
    map[pos.y][pos.x] = 2


}

// let spawnEnemy = 
// setInterval(() => {
for (let i = 0; i < 100; i++) {
    enemies.push({
        path: path,
        counter: 0
    });
}
let c = 0
setInterval(() => {
    let e = enemies[c]
    setInterval(() => {
        enemyMove(e)
    }, 500);
    c++
}, 2000);


//     setInterval(enemtMove, 1000, e);

// }, 3000);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))