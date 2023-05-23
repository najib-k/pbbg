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

function setTile(x, y, tile) {
    map.tilemap[y][x] = {...map.tilemap[y][x], ...tile};
}

function getMap() {
    return map;
}

module.exports = {
    getMap,
    setTile
}