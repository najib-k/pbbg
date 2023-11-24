const { getTile } = require('./mapHandler');
const { statFormula } = require('./formulaHandler')
const { getRandomInt } = require('./utils');
const { action } = require('./constants');
const { generateUniqueItem } = require('./generator');
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
        keywords: [],
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

    },
    {
        name: "dragon",
        lvl: [1, 2], //[min, max]
        modifiers: {
            all: .7,
            attack: .5,
        },
        keywords: [0, 1, 2],
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

    },
]

const items = [
    {
        id: 0,
        name: "gold",
        stack: -1,
    },
    {
        id: 1,
        name: "potion",
        stack: 64,
    },

]

const ressources = {
    [action.GATHERING_SUB.mining]: [{id: 100, name: "copper"}],
    [action.GATHERING_SUB.foraging]: [{id: 200, name: "wheat"}],
    [action.GATHERING_SUB.quarrying]: [{id: 300, name: "rock"}],
    [action.GATHERING_SUB.fishing]: [{id: 400, name: "Nemo"}],

}

/**
 * 
 * @param {*} id monster Id
 * @returns {object} {name, lvl, drop: id, stats}
 */
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
    defaultMax: 10,
    defaultItemRate: 99,
};

function generateDrops(e, invId, ownerId) {
    let result = [];
    let {drop: d = []} = e;
    if (getRandomInt(100) <= drops.defaultItemRate) {
        result.push(generateUniqueItem({e, invId, ownerId}))
    }
    result.push(...monsterDefs[d].drop.map((i) => {
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
    }));

    return result;
}

function generateRessource(type) {
    let r = ressources[type][getRandomInt(ressources[type].length)];
    //get amount depending on somethign like rarity vs level/proficiency to have infinite scaling
    r.amount = 1;
    return r;
}

module.exports = {
    spawnFromTile,
    generateDrops,
    generateRessource,
}