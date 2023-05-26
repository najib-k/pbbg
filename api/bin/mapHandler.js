const { getRandomInt } = require('./utils')

let map = {
    width: 20,
    height: 20,
    tileSize: {
        width: 40,
        height: 40,
    },
    tilemap: [
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 1}, {type: 1}],
        [{type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 1}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 0}, {type: 0}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 2}, {type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 0}],
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 1}, {type: 1}],
        [{type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 1}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 0}, {type: 0}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 2}, {type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 0}],
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 1}, {type: 1}],
        [{type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 1}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 0}, {type: 0}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 2}, {type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 0}],
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 1}, {type: 1}],
        [{type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 1}, {type: 1}, {type: 1}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 0}, {type: 2}, {type: 2}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 0}, {type: 1}, {type: 2}],
        [{type: 1}, {type: 0}, {type: 1}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 1}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 1}],
        [{type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 0}, {type: 0}, {type: 0}, {type: 2}, {type: 0}, {type: 0}, {type: 2}, {type: 1}, {type: 2}, {type: 1}, {type: 1}, {type: 2}, {type: 2}, {type: 1}, {type: 0}, {type: 0}],
    ]
};

const TILE_TYPE =     [
     "water",
     "land", 
     "forest",
];

function setTile({x, y}, tile) {
    map.tilemap[y][x] = {...map.tilemap[y][x], ...tile};
}

function getTile({x, y}) {
     return {type: TILE_TYPE[map.tilemap[y][x].type]};
}

function getMap() {
    return map;
}

function generateRandomPos() {
    let x = getRandomInt(map.width);
    let y = getRandomInt(map.height);

    return {x, y}
}

module.exports = {
    getMap,
    setTile,
    getTile,
    generateRandomPos,
}