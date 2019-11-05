let enemies = [{}]
function setup() {
    createCanvas(windowWidth, windowHeight)
}

creteEnemy = () => {
    let e = ellipse(0 , windowHeight / 2 +40, 40,40)
    enemies.push({enemy: e, pos: 0})
}

function draw() {
    rect(0, windowHeight / 2, windowWidth, 80);
    enemies.forEach(ene => {
        ene.pos += 0.1;
        ene.e = ellipse( ene.pos, windowHeight / 2 +40, 40,40)
    })
}
setInterval( () => {
    creteEnemy()
}, 1000)