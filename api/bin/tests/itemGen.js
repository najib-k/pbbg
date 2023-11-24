const { UUIDV4 } = require('sequelize');
const { generateUniqueItem } = require('../generator');
const mh = require('../mapHandler');
const { randomUUID } = require('crypto');

/* console.time("pathing")
//let result = mh.moveActionBuildPath({x: 0, y: 0}, {x: 11, y: 10})
console.timeEnd("pathing")
console.time("randomGeneration")
let r = Array();
for (let i = 0; i <= 60000; i++) r.push(Math.max(0, Math.min(Math.random(), 1)));
console.timeEnd("randomGeneration")
console.log(r)
//mh.visualisePath([])

//mh.visualisePath(result)
//console.log(result) */

/**
 * GENERATOR
 */

let rarityTest = {
    Crap: 0,
    Common: 0,
    Unusual: 0,
    Rare: 0,
    Magic: 0,
    Legendary: 0,
    Blessed: 0,
    Artifact: 0,
};

let options = {
    lvl: 1,
};

let result = []

for (let x = 0; x < 10; x++) {
    let n = generateUniqueItem(options);
    //console.log(util.inspect(n, {depth: 42}))
    //result[n.name] = result[n.name] + 1 || 1;
    n.id = randomUUID();
    console.log(n.id);
    result.push({...n});
}

console.log(JSON.stringify({result}));