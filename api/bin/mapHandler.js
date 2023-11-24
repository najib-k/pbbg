const { getRandomInt } = require('./utils')
const { move } = require('./constants');
const { manhattanDistanceFormula } = require('./formulaHandler');
const PF = require('pathfinding');



let map = {
    width: 20,
    height: 20,
    tileSize: {
        width: 40,
        height: 40,
    },
    tilemap: [
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }],
        [{ type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }],
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }],
        [{ type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }],
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }],
        [{ type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }],
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }],
        [{ type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 0 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 0 }, { type: 1 }, { type: 2 }],
        [{ type: 1 }, { type: 0 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 1 }],
        [{ type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }, { type: 2 }, { type: 1 }, { type: 2 }, { type: 1 }, { type: 1 }, { type: 2 }, { type: 2 }, { type: 1 }, { type: 0 }, { type: 0 }],
    ]
};

const TILE_TYPE = [
    {
        type: "water", mod: {
            danger: 1, //how hard to traverse (% chance), mob diff ?
            pass: 25, // % to trigger combat
            walkable: false, //default value for PF

        }
    },
    {
        type: "land", mod: {
            danger: 1,
            pass: 25,
            walkable: true,

        }
    },
    {
        type: "forest", mod: {
            danger: 1,
            pass: 25,
            walkable: true,

        }
    },
];

//Which tiles types are unwalkable by default
const invalid_move = [0];

/**
 * Pathfinding setup.
 */
const grid = new PF.Grid(walkableMatrix())
const finder = new PF.AStarFinder();

/**
 * Creates a walkable matrix to be used for PF
 * 
 * 1 = unwalkable
 * 0 = fine
 * @returns walkable stats matrix
 */
function walkableMatrix() {
    let m = getMap();
    return m.tilemap.map(r => r.map(t => t.mod.walkable ? 0 : 1));
}

function setTile({ x, y }, tile) {
    map.tilemap[y][x] = { ...map.tilemap[y][x], ...tile };
}

function getRawTile({ x, y }) {
    let m = getMap();
    if ((x < 0 || y < 0) || (x >= m.width || y >= m.height)) {
        return false
    }
    return map.tilemap[y][x];
}

function getTile({ x, y }) {
    return TILE_TYPE[map.tilemap[y][x].type];
}

function getMap() {
    return map;
}

function generateRandomPos() {
    let x = getRandomInt(map.width);
    let y = getRandomInt(map.height);

    return { x, y }
}

function traverseTile(pos, t, cb) {
    let { mod } = getTile(pos);

    let tb = move.try ** t;
    let dd = move.danger ** mod.danger;

    let pass = Math.max(mod.pass * dd * tb * (cb ? move.cBuff : 1), move.minPass);

    if (pass >= 100) {
        return true
    }

    let r = getRandomInt(100);

    return (pass >= r);
}


function relativeSignPosition(p, p2) {
    return {
        x: Math.sign(p.x - p2.x),
        y: Math.sign(p.y - p2.y)
    }
}

function visualisePath(path = []) {
    const visuals = [
        ['┘', '|', '└'],
        ['-', '', '-'],
        ['┐', '|', '┌']
    ]

    let m = getMap();
    let map = [['+', ...Array(m.width).fill('-'), '+']]
    map = [map[0], ...Array.from({ length: m.height }, e => ['|', ...Array(m.width).fill(' '), '|']), map[0]];


    path.forEach((p, idx) => {
       
        let o = relativeSignPosition(path[idx - 1] || p, p);
        let b = relativeSignPosition(path[idx + 1] || p, p);
        let pos = { x: o.x + b.x, y: o.y + b.y }
        if (idx === path.length - 1) {
            map[p.y + 1][p.x + 1] = 'S'
        }
        else if (idx === 0) {
            map[p.y + 1][p.x + 1] = 'E'
        }
        else {
            map[p.y + 1][p.x + 1] = visuals[pos.y + 1][pos.x + 1] || visuals[o.y + 1][o.x + 1];
        }
    });
    //map.forEach((row) => console.log(row.join('')))
}


function moveActionBuildPath(current, dest) {
    let g = grid.clone(); //always clone, the algo trashes the grid it uses.
    //see for weights: https://github.com/jbrown123/PathFinding.js/tree/master
    //TODO: add weights
    let p = finder.findPath(current.x, current.y, dest.x, dest.y, g)
    return p.map((t) => {
        let [x, y] = t;
        return {x, y};
    });
}

/*

THIS IS OLD PF CODE
TAKES 1000x MORE TIME
NOT EVEN THOUGHT ABOUT LINKED LIST
IAM AN IDIOT
NOT A JOKE

function getMoveableSurrounding(x, y) {
    let t = [];
    let m = getMap();
    (invalid_move.includes(getRawTile({ x: x - 1, y }).type)) ? null : (x - 1 >= 0) ? t.push({ x: x - 1, y }) : null;
    (invalid_move.includes(getRawTile({ x: x + 1, y }).type)) ? null : (m.width > x + 1) ? t.push({ x: x + 1, y }) : null;
    (invalid_move.includes(getRawTile({ x, y: y + 1 }).type)) ? null : (m.height > y + 1) ? t.push({ x, y: y + 1 }) : null;
    (invalid_move.includes(getRawTile({ x, y: y - 1 }).type)) ? null : (y - 1 >= 0) ? t.push({ x, y: y - 1 }) : null;
    return t;
}

function alreadyTraversedPath(path, { x, y }) {
    for (const p of path) {
        if (p.y === y && p.x === x) return true;
    }
    return false;
}

function moveActionBuildPath(current, dest, depth = 0) {
     let paths = [];
    if (!Array.isArray(current)) current = [current];

    if (depth >= 30) return null;
    //let d = "".padStart(depth, '-');
    //console.log(`${d}[${depth}]${d}${JSON.stringify(current[0])}`)
    if (current[0].x === dest.x && dest.y === current[0].y) {
        //console.log("found")
        return current;
    }

    let t = getMoveableSurrounding(current[0].x, current[0].y);
    //console.log("pre", t)
    t = t.filter((tile) => (alreadyTraversedPath(current, tile)) ? false : true)
    //console.log("after", t)
    if (t.length === 0) return null;

    for (const tile of t) {
        let res = moveActionBuildPath([tile, ...current], dest, depth + 1)
        if (res !== null) {
            //console.log(res)
            paths.push(res);
        };
        //console.clear();
        //visualisePath(path)
    };
    if (paths.length > 0) {
        let i = 0;
        paths.forEach((p, idx) => p.length < paths[i].length ? i = idx : null)
        return paths[i];
    }

    return null; 
}*/

module.exports = {
    getMap,
    setTile,
    getTile,
    getRawTile,
    generateRandomPos,
    traverseTile,
    moveActionBuildPath,
    visualisePath,
}