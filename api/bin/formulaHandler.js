const {stats} = require('./constants');

function statFormula(l, mod) {
    let {all = 1} = mod;
    let {health = all, defense = all, attack = all} = mod;

    health = Math.ceil(stats.GROWTH.health * l * health);
    attack = Math.ceil(stats.GROWTH.attack * l * attack);
    defense = Math.ceil(stats.GROWTH.defense * l * defense);

    return {
        health,
        attack,
        defense,
    }
}

function damageFormula(a, d) {
    
    let result = Math.floor(Math.min(Math.max((a.stats.attack / d.stats.defense), .4), 1.2) * a.stats.attack) + 1;

    return Math.min(result, d.stats.remainingHealth);
}

module.exports = {
    statFormula,
    damageFormula,
}