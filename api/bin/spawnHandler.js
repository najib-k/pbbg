const { getTile } = require('./mapHandler');
const { statFormula } = require('./formulaHandler')
const { getRandomInt } = require('./utils');
const debug = require('debug')('spawn');

const spawnByZone = {
    water: [0,],
    land: [0,],
    forest: [0,],
}

/**
 * 
 */
const monsterDefs = [
    {
        name: "dummy",
        lvl: [1, 2], //[min, max]
        modifiers: {
            all: .7,
            attack: .5,
        },
        drop: [
            {
                id: 1,
                uuid: false,
                drc: 50, //rate
                amount: [1, 3, 60, 1] // [min, max, re-drc, step]
            },
            {
                id: 0,
                uuid: false,
                drc: 90, //rate
                amount: [1, 10, 75, 1] // [min, max, re-drc, step]
            }
        ]

    }
]

const items = [
    {
        name: "gold",
        stack: -1,
    },
    {
        name: "potion",
        stack: 64,
    },

]

function generateMonsterProfile(id) {
    let {name, lvl: [mn, mx], drop, modifiers} = monsterDefs[id];

    lvl = getRandomInt(mx, mn);
    let stats = statFormula(lvl, modifiers)
    return {name, lvl, drop: id, stats};
}

function spawnFromTile(p) {
    let t = getTile(p.pos);

    let zone = spawnByZone[t.type];
    let id = zone[getRandomInt(zone.length)];

    
    return generateMonsterProfile(id);
}

const drops = {
    defaultMax: 10
};

function generateDrops(d) {
    return monsterDefs[d].drop.map((i) => {
        let {id, drc, uuid, amount } = i;
        let rng = getRandomInt(100);
        if (drc >= rng) {
            let [mn = 0, mx = drops.defaultMax, rate = 100, step = 1] = amount;
            let a = mn;
            for (; a <= mx && rate >= getRandomInt(100); a += step);
            debug(`Dropped ${a} ${items[id].name}`);
            return {
                id,
                name: items[id].name,
                uuid,
                amount: a,
            }
        }
        return {amount: 0};
    })
}

module.exports = {
    spawnFromTile,
    generateDrops,
}