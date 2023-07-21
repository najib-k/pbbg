const {stats} = require('./constants');

const modFunction = {
    "+": (b, v) => b + v,
    "*": (b, v) => b * v,
    "-": (b, v) => b - v,
}

/**
 * 
 * @param {number} l level
 * @param {number} mod stat modifiers
 * @returns Basic stat for relevant lvl.
 */
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

/**
 * 
 * @param {Object} a Attacker
 * @param {Object} d Defender
 * @returns Damage taken by Defender.
 */
function damageFormula(a, d) {
    
    let result = Math.floor(Math.min(Math.max((a.stats.attack / d.stats.defense), .4), 1.2) * a.stats.attack) + 1;

    return Math.min(result, d.stats.remainingHealth);
}

/**
 * 
 * @param {number} mod Growth factor of that stat
 * @param {number} r Rarity
 * @param {number} lvl Level
 */
function affStatFormula(mod, r, lvl){
    let result = (r**mod)*(lvl/100)+((1+(lvl/100))**r)*mod+(mod*lvl*(r/8));
    return result;
}

function manhattanDistanceFormula(p, p2) {
    return Math.abs(p.x - p2.x) + Math.abs(p.y - p2.y);
}

function modFormula(base, mod) {
    mod.forEach(({value, stat, op}) => {
        if (!base?.[stat]) return (base[stat] = value);

        return modFunction[op](base[stat], value);
    });
    return base;
}

module.exports = {
    statFormula,
    damageFormula,
    affStatFormula,
    manhattanDistanceFormula,
    modFormula,
}