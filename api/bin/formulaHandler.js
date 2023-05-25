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
    let result = Math.floor(Math.min(Math.max(a.attack / d.defense, .4), 1.2) * a.attack);
    return Math.min(Math.max(result, 1), d.remainingHealth);
}

module.exports = {
    statFormula,
    damageFormula,
}