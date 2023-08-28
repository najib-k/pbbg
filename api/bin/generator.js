const { affStatFormula, applyMods } = require("./formulaHandler");
const { getRandomInt, getRandomFloat } = require("./utils");
const keywords = require('./keywords');
const constants = require("./constants");
const debug = require('debug')("gen");
const util = require('node:util');const { Item } = require("../config/models/Item");
const { UUIDV4 } = require("sequelize");
 ;

const rarity = [
    {
        name: "Crap",
        affixes: [0, 0, 0], // [nb aff, upgrade chc, base up points]
        mod: { repair: 0.45, stat: 0.7, },
    },
    {
        name: "Common",
        affixes: [1, 0, 3],
        mod: { repair: 0.70, stat: 1, },
    },
    {
        name: "Unusual",
        affixes: [1, 25, 6],
        mod: { repair: 1.2, stat: 1.6, },
    },
    {
        name: "Rare",
        affixes: [2, 33, 9],
        mod: { repair: 1.95, stat: 2.8, },
    },
    {
        name: "Magic",
        affixes: [4, 40, 12],
        mod: { repair: 2.95, stat: 5.2, },
    },
    {
        name: "Legendary",
        affixes: [5, 48, 15],
        mod: { repair: 4.2, stat: 10, },
    },
    {
        name: "Blessed",
        affixes: [5, 55, 18],
        mod: { repair: 5.7, stat: 19.6, },
    },
    {
        name: "Artifact",
        affixes: [7, 63, 21],
        mod: { repair: 7.45, stat: 38.8, },
    },
]

const rarityRates = [99.9, 99.6, 98.6, 96, 90, 75, 50, 0];

const quality = [
    { name: "F", mod: 1 },
    { name: "E", mod: 1.5 },
    { name: "D", mod: 2.5 },
    { name: "C", mod: 4 },
    { name: "B", mod: 6 },
    { name: "A", mod: 8.5 },
    { name: "S", mod: 11.5 },
    { name: "SS", mod: 15 },
    { name: "SSS", mod: 19 },
]

const affixesByRarities = [
    [0, 1, 2, 4],
    [0, 1, 2, 4],
    [0, 1, 2, 4],
    [0, 1, 2, 4],
    [0, 1, 2, 4],
    [0, 1, 2, 4],
    [0, 1, 2, 4],
    [0, 1, 2, 4],
]

const affixes = [
    {
        name: "attack",
        mod: { attack: {} },
    },
    {
        name: "defense",
        mod: { defense: {} },

    },
    {
        name: "health",
        mod: { health: {} },
    },
    {
        name: "chc",
        mod: { chc: {} },
    },
    {
        name: "chd",
        mod: { chd: {} },
    },
];

const drop = {
    uuid: true
}

const dropConfig = {
    minQ: -4,
    maxQ: 2,
    minKword: 0.5,
}

/**
 * 
 * @param {number} mnR Minimum rarity (optional). Default: lowest rarity.
 * @returns {Object} Rarity ID to be used in corresponding table.
 */
function getRarity(mnR) {
    let i = getRandomInt(10001, rarityRates[mnR] * 100) / 100;
    for (const [idx, r] of rarityRates.entries()) {
        if (i >= r) {
            let rarityIdx = (rarityRates.length - 1) - idx;
            //console.log("rarityIdx",rarityIdx);
            return { r: rarity[rarityIdx], idx: rarityIdx };
        }
    }
}

/**
 * 
 * @param {Object[]} a array of aff rarities
 * @returns {Boolean} True if all aff reached max rarity.
 */
function isAffMaxedOut(a) {
    for (let aff of a) {
        if (a !== rarity.length - 1) return false;
    }
    return true;
}

/**
 * Spend 1 point each try to up rarity of current aff, on fail goes to the next one.
 * Stops when all points spent or all aff hit max possible rarity.
 * 
 * @param {number[]} param0 [max nb of aff, % to proc rarity upgrade, number of points to spend]
 * @param {number} mod Point multiplier from quality.
 * @returns List of aff generated & points left if any.
 */
function distributeAffPoints([mx, ch, p], mod) {
    if (ch === 0) return {};
    let a = Array.from({ length: mx }, x => 0);
    let cnt = 0;

    for (p = p * mod; p > 0 && isAffMaxedOut(a) != true; p--) {
        let rng = getRandomInt(10000) / 100;
        if (a[cnt] === rarity.length - 1) {cnt++ }
        else if (rng <= ch) {
            a[cnt]++;
            //console.log(a);
        } else {
            cnt++;
        }
        if (cnt === mx) {cnt = 0}
    }
    return { a, p };
}

/**
 * 
 * @param {number} ar Aff rarity
 * @param {number} lvl Object lvl
 * @param {Set} dupes Set containing already obtained affs
 * @returns Randomly generated affix with lvl/rarity based stat.
 */
function getRandomAffix(ar, lvl, dupes) {

    //If all aff generated at least once then ignore & reset dupes when back to function call.
    let affArr = affixesByRarities[ar].filter(x => !dupes.has(x))
    if (affArr.length === 0) affArr = affixesByRarities[ar];
    let id = affArr[getRandomInt(affArr.length)];

    let aff = affixes[id];

    Object.keys(aff.mod).forEach((s) => {
        //mx stat = current rarity, min = 1 rarity below, generate random in between
        // - Generate a value from the basique modificator
        let { op, value } = constants.default_mod[s];
        aff.mod[s] = { op, value: affStatFormula(value, getRandomFloat(ar + 1, ar), lvl) }
        //console.log(lvl, ar, aff.mod[s])
    });
    return { aff, id };
}

function getMainAffix(obj, lvl) {
    const { rarity, keywords: kw } = obj;

    let aff = keywords.baseGtAffix[kw[0].type] || keywords.baseGtAffix[0];
    Object.keys(aff.mod).forEach((s) => {
        //mx stat = current rarity, min = 1 rarity below, generate random in between
        // - Generate a value from the basique modificator
        let { op, value } = constants.default_mod[s];

        //console.log("value: ", rarity);
        aff.mod[s] = {kw: 0, op, value: affStatFormula(value, getRandomFloat(rarity + 1, rarity), getRandomInt(lvl * constants.affixes.genLvlMax, lvl * constants.affixes.genLvlMin)) }
        //console.log(lvl, ar, aff.mod[s])
    });
    aff.mod = applyMods(aff.mod, kw[0].mod);
    //console.log("post equi mod", aff)
    return aff;
}

/**
 * 
 * @param {Object} r Object global rarity
 * @param {number} lvl Obj lvl
 * @returns Array of affixes.
 */
function generateAff(r, lvl) {
    let { affixes, quality: { mod } } = r;

    let { a = [], p = 0 } = distributeAffPoints(affixes, mod);
    let dupes = Array.from({ length: affixesByRarities.length }, x => new Array());
    return [getMainAffix(r, lvl), ...a.map((ar) => {
        let { aff, id } = getRandomAffix(ar, lvl, new Set(dupes[ar]));
        aff.rarity = ar;
        // if ID already in there then dupes were reset and ignored.
        dupes[ar].includes(id) ? dupes[ar] = [id] : dupes[ar].push(id);
        return aff;
    })];

}

function getQuality(idx) {
    let mx = Math.min(quality.length, idx + dropConfig.maxQ); //length or less
    let mn = Math.max(0, idx + dropConfig.minQ); //0 or higher

    return quality[getRandomInt(mx, mn)];
}

function generateKeywords(r, mt = {}) {
    let nbk = getRandomInt(r + 1, Math.trunc(r * dropConfig.minKword))
    console.log("min nbk", nbk)

    let gt = keywords.gearTypes[getRandomInt(keywords.gearTypes.length)];
    let kl = [gt[getRandomInt(gt.length)]];
    let drpT = keywords.default.concat(mt?.keywords || []);

    while (nbk > kl.length && drpT.length > 0) {
        let i = getRandomInt(drpT.length - 1);
        console.log(drpT[i])
        kl.push(drpT[i]);
        drpT.splice(i, 1);
    }

    return kl;
}

function generateUniqueItem({ lvl = 1, mnR = (rarityRates.length - 1), mt = {}, invId, ownerId } = {}) {
    let { r, idx } = getRarity(mnR);
    r.uuid = true;
    r.amount = 1;
    r.rarity = idx;
    r.lvl = lvl;
    r.keywords = generateKeywords(idx, mt);
    r.type = r.keywords[0].name;
    r.quality = getQuality(idx);
    r.affixes = generateAff(r, lvl);
    r.inventoryId = invId;
    r.ownerId = ownerId;
    return r;
}

module.exports = {
    generateUniqueItem,
}