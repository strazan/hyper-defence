const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const tileSize = Math.floor(window.innerWidth / 16);
// 16x16 map
const mapString = `
xxxxxxxxxxxxxxxx
x----x---------x
x----x----x----x
x----x----x----x
x----x----x----x
x----x----x----x
x----x----x----x
x----x----x----x
x----xxxxxx-xxxx
x--------------x
x----x---------x
x----x---------x
x----x---------x
x----x---------x
x----x---------x
xxxxxxxxxxxxxxxx
`;
// Convert into array matrix

const map = mapString
    .split('\n')
    .filter(row => row)
    .map(row => {
        return row
            .split('')
            .map(col => col === 'x' ? 1 : 0);
    });
    map[1][1] = 2;
    console.log(map)

    // Turn map state into drawing
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    map.forEach((row, x) => {
        row.forEach((tile, y) => {
            context.fillStyle = tile === 1 ? 'salmon' : 'white';
            context.fillStyle = tile === 2 ? 'black' : '';
            context.fillRect(y * tileSize, x * tileSize, tileSize, tileSize);
        })
    })
    // window.requestAnimationFrame(render);
}
render();
// let enemyPos = 1
// setInterval(() => {
//     map[enemyPos][1] = 0
//     enemyPos++
//     map[enemyPos][6] = 2
//     console.log(map)
// }, 1000)