const {stats, battle, user} = require('./constants');
const { getRandomFloat, getRandomInt } = require('./utils');


//Mods are stats upgrade.
//Effects are conditionnal skills that can apply a mod.
const modFn = {
    "+": (b, v) => b + v,
    "*": (b, v) => b * v,
    "-": (b, v) => b - v,
    "/": (b, v) => b / v,
    "%+": (b, v, p) => b + (Math.round((v * p)) + 1), // Add % of value, adds 1 in case result is 0. P in [0, 1].
    "%+": (b, v, p) => b - (Math.round((v * p)) + 1), // Add % of value, adds 1 in case result is 0. P in [0, 1].
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
 * @param {Object} caster Attacker
 * @param {Object} target Defender
 * @returns Damage taken by Defender.
 */
function damageFormula(caster, target, effect) {
    const {attack = user.default.stats.attack, chc = user.default.stats.chc, chd = user.default.stats.chd} = caster.stats;
    const { defense = user.default.stats.defense, evasion = user.default.stats.evasion} = target.stats;
    let chcB = Math.ceil(chc / 100);
    let chcR = chc % 100;
    console.log(chcB, chcR)
    
    //let result = Math.floor(Math.min(Math.max((caster.stats.attack / target.stats.defense), .4), 1.2) * caster.stats.attack) + 1;
    let result = attack;
    console.log(result)
    if (getRandomInt(100) <= chcR) {
        chcB++;
    }
    result *= (chcB + 1) * ((chd / 100) + 1);
    console.log(result)

    result *= attack / (attack + defense);
    console.log(result)

    caster.damageMod.forEach((mod) => {
        if(mod.stacks === 0 || !mod.target.includes(target.id)) return;
        if (mod.on.includes(battle.effectTypes.any) || effect.effectType.some((t) => mod.on.includes(t))){
            result = modFn[mod.op](mod.value, result);
            mod.stacks -= 1;
        }
    });
    console.log(result)

    return Math.floor(result);
}

/**
 * 
 * @param {number} mod Growth factor of that stat
 * @param {number} r Rarity
 * @param {number} lvl Level
 */
function affStatFormula(mod, r, lvl){
    let result = (r**mod)*(lvl/100)+((1+(lvl/100))**r)*mod+(mod*lvl*(r/8));
    return result.toFixed(2);
}

function manhattanDistanceFormula(p, p2) {
    return Math.abs(p.x - p2.x) + Math.abs(p.y - p2.y);
}

/**
 * 
 * @param {object} base stats object, ie: player.stats
 * @param {object} mod mod object, ie: equipment.mod / affixes.mod
 * @returns updated stats object
 */
function applyMods(base, mod) {
    console.log(base, mod);
    if (!mod) return base;
    Object.keys(mod).forEach((stat) => {
        let {value, op} = mod[stat];
        if (!base?.[stat]) return (base[stat] = {value, op} );

        base[stat].value = modFn[op](base[stat].value, value);
    });
    return base;
}

function applyModsToStats(base, mod) {
    console.log(base, mod);
    if (!mod) return base;
    Object.keys(mod).forEach((stat) => {
        let {value, op} = mod[stat];
        if (!base?.[stat]) return (base[stat] = value );

        base[stat] = modFn[op](base[stat], value);
    });
    return base;
}

function hitFormula({caster, target}) {
    const {wpkw, stats, ftree} = caster;
    const {stats: {evasion}} = target;
    const {ability, buff} = ftree;
    const {hit = 1} = buff;
    let cHit = stats[ability.hitStat] * hit;

    let base = cHit + Math.max(evasion, cHit * battle.defaultEvasionHitRate);
    let roll = getRandomInt(base);
    return roll <= Math.max(cHit * battle.defaultEvasionHitRate);
}

module.exports = {
    statFormula,
    damageFormula,
    affStatFormula,
    hitFormula,
    manhattanDistanceFormula,
    applyMods,
    applyModsToStats,
    modFn,
}