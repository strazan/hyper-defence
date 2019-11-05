const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const tileSize = Math.floor(window.innerWidth / 16);
// const mapString = `
// xxxxxxxxxxxxxxxx
// x----x---------x
// x----x----x----x
// x----x----x----x
// x----x----x----x
// x----x----x----x
// x----x----x----x
// x----x----x----x
// x----xxxxxx--xxx
// x--------------x
// x--------------x
// x----x---------x
// x----x---------x
// x----x---------x
// x----x---------x
// xxxxxxxxxxxxxxxx
// `;

let path;
// Convert into array matrix

// const map = mapString
//     .split('\n')
//     .filter(row => row)
//     .map(row => {
//         return row
//             .split('')
//             .map(col => col === 'x' ? 1 : 0);
//     });
setInterval(() => {
    fetch('http://localhost:3000/game/')
        .then(function (response) {
            // console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            makePath(myJson.map)
        });
}, 200);


function makePath(map) {
    context.clearRect(0, 0, canvas.width, canvas.height);


    map.forEach((row, y) => {
        row.forEach((tile, x) => {
        

            switch (tile) {
                case 0:
                    context.fillStyle = '#fff'
                    break;
                case 1:
                    context.fillStyle = '#000';
                    break;
                case 2:
                    context.fillStyle = 'salmon';
                    break;
            }
            context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        });

        // path.forEach((tile, i) => {
        //     setTimeout(() => {
        //         context.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
        //     }, i * 100)
        // });
    })
}