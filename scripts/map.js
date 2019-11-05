let map = [];
let TILE_SIZE = window.innerWidth
let DOMGrid = document.getElementById('map')

for (let i = 0; i < 8; i++) {
    let row = []
    for (let j = 0; j < 8; j++) {
        row.push(0)
        let div = document.createElement('DIV')
        // div.style.border = '1px solid #333'
        DOMGrid.appendChild(div)

    }
    map.push(row);
}




map[2][3] = 1
paintMap(DOMGrid.children, map)

function paintMap(g, m) {
    let counter = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (m[i][j] === 0) {
                g[counter].style.backgroundColor = 'salmon'
            } else if(m[i][j] === 1){
                g[counter].style.backgroundColor = '#fff'
            } else {
                g[counter].style.backgroundColor = '#222'
            }
            counter++;
        }
    }
}