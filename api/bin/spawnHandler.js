const { getTile } = require('./mapHandler');
const { statFormula } = require('./formulaHandler')

const spawnByZone = {
    water: [0],
    land: [0],
    forest: [0],
}

/**
 * 
 */
const monsterDefs = [
    {
        name: "dummy",
        lvl: [0, 3], //[min, max]
        modifiers: {
            all: .7,
        },
        drop: [
            {
                id: 0,
                drc: 50, //rate
                amount: [1, 3, 60, 1] // [min, max, re-drc, step]
            }
        ]

    }
]

function generateMonsterProfile(id) {
    let {name, lvl, drop, modifiers} = monsterDefs[id];

    let stats = statFormula(lvl, modifiers)
    return {name, lvl, drop, stats};
}

function spawnFromTile(p) {
    let t = getTile(p.details.pos);

    let zone = spawnByZone[t.type];
    let id = zone[getRandomInt(zone.length)];

    
    return generateMonsterProfile(id);;
}

/**
 *  
 * @param {number} max Excluded, ie: 3 -> [0,1,2].
 * @param {number} min Added to final result.
 * @returns random number.
 */
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

exports.module = {
    spawnFromTile,
}