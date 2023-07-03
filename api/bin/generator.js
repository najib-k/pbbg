const { affStatFormula } = require("./formulaHandler");
const { getRandomInt } = require("./utils");

const rarity = [
    {
        name: "Crap",
        affixes: [0, 0, 0], // [nb aff, upgrade chc, base up points]
        mod: { repair: 0.45, stat: 0.7, },
    },
    {
        name: "Common",
        affixes: [1, 0, 0],
        mod: { repair: 0.70, stat: 1, },
    },
    {
        name: "Unusual",
        affixes: [1, 25, 1],
        mod: { repair: 1.2, stat: 1.6, },
    },
    {
        name: "Rare",
        affixes: [2, 33, 2],
        mod: { repair: 1.95, stat: 2.8, },
    },
    {
        name: "Magic",
        affixes: [4, 40, 3],
        mod: { repair: 2.95, stat: 5.2, },
    },
    {
        name: "Legendary",
        affixes: [5, 48, 5],
        mod: { repair: 4.2, stat: 10, },
    },
    {
        name: "Blessed",
        affixes: [5, 55, 8],
        mod: { repair: 5.7, stat: 19.6, },
    },
    {
        name: "Artifact",
        affixes: [7, 63, 12],
        mod: { repair: 7.45, stat: 38.8, },
    },
]

const rarityRates = [99.9, 99.6, 98.6, 96, 90, 75, 50, 0];

const quality = [
    {name: "F", mod: 1},
    {name: "E", mod: 1.5},
    {name: "D", mod: 2},
    {name: "C", mod: 2.5},
    {name: "B", mod: 3},
    {name: "A", mod: 3.5},
    {name: "S", mod: 4},
    {name: "SS", mod: 4.5},
    {name: "SSS", mod: 5},
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
        mod: {
            attack: 0.5, // [mn, mx, mtp] minimum, maximum, multiplier
        },
    },
    {
        name: "defense",
        mod: {
            defense: 1.8, // [mn, mx, mtp]
        },
    },
    {
        name: "health",
        mod: {
            health: 2.2, // [mn, mx, mtp]
        },
    },
    {
        name: "chc",
        mod: {
            criticalChance: 1.5, // [mn, mx, mtp]
        },
    },
    {
        name: "chd",
        mod: {
            criticalDamage: 0.7, // [mn, mx, mtp]
        },
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
    console.log(i)
    for (const [idx, r] of rarityRates.entries()) {
        if (i >= r) {
            
            return {r: rarity[(rarityRates.length - 1) - idx], idx};
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
 let a = new Array(mx).fill(0);
 let cnt = 0;

 for (p = p*mod; p > 0 && isAffMaxedOut(a) != true; p--) {
    let rng = getRandomInt(10000) / 100;
     if (rng <= ch) {
         a[cnt]++;
         console.log(a);
     } else {
         cnt++;
         if (cnt === mx) cnt = 0;
     }
     while (a[cnt] === rarity.length - 1) cnt++;
 }
 return {a, p};
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
    let affArr = dupes.length === affixesByRarities[ar].length ? affixesByRarities[ar] : affixesByRarities[ar].filter(x => !dupes.has(x))
    let id = affArr[getRandomInt(affixesByRarities[ar].length)];
    let aff = affixes[id];

    Object.keys(aff.mod).forEach((s) => {
        //mx stat = current rarity, min = 1 rarity below, generate random in between
        aff.mod[s] = affStatFormula(aff.mod[s], getRandomInt(ar + 1, ar), lvl) 
        console.log(lvl, ar, aff.mod[s])
    });
    return {aff, id};
}

/**
 * 
 * @param {Object} r Object global rarity
 * @param {number} lvl Obj lvl
 * @returns Array of affixes.
 */
function generateAff(r, lvl) {
    let { affixes, quality: {mod} } = r;

    let {a = [], p = 0} = distributeAffPoints(affixes, mod);
    let dupes = new Array(affixesByRarities.length).fill([]);
    return a.map((ar) => {
        let {aff, id} = getRandomAffix(ar, lvl, new Set(dupes[ar]));
        aff.rarity = ar;
        // if ID already in there then dupes were full and ignored.
        dupes[ar].includes(id) ? dupes[ar] = [id] : dupes[ar].push(id);
        return aff;
    });

}

function getQuality(idx) {
    let mx = Math.floor(quality.length, idx + dropConfig.maxQ);
    let mn = Math.ceil(0, idx + dropConfig.minQ);

    return quality[getRandomInt(mx, mn)];
}

function generateKeywords(r, mt) {
    let nbK = getRandomInt(r + 1, Math.trunc(r * dropConfig.minKword))

    let gt = keywords.gearTypes[getRandomInt(keywords.gearTypes.length)];
    let kl = [gt[getRandomInt(gt.length)]];

    while (nbk !== 0) {

    }

    return kl;
}

function generateUniqueItem(lvl, mnR = (rarityRates.length - 1), mt = {}) {
    let {r, idx} = getRarity(mnR);
    r.quality = getQuality(idx);
    r.affixes = generateAff(r, lvl);
    r.keywords = generateKeywords(idx, mt);
    console.log(JSON.stringify(r));
    return r;
}

let result = {
    Crap: 0,
    Common: 0,
    Unusual: 0,
    Rare: 0,
    Magic: 0,
    Legendary: 0,
    Blessed: 0,
    Artifact: 0,
};
let lvl = 100;
for (let x = 0; x < 1; x++) {
    let n = generateUniqueItem(lvl);
    console.log(n)
    result[n.name] = result[n.name] + 1 || 1;
}

console.log(result);