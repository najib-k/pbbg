const { battle } = require("../constants");


const abilities = {
     elusiveStep: require("./elusiveStep"),
     poison: require("./poison"),
     vanish: require('./vanish'),
     counterAttack: require('./counterAttack'),
     [battle.defaultAttack]: require('./basic'),
}

function runAbility(name, params) {
     return abilities[name](params);
}

module.exports = {abilities, runAbility};