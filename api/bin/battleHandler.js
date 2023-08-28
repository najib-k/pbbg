const { damageFormula, applyMods } = require('./formulaHandler');
const { battle, action } = require('./constants');

function fight(a, d, status, noMobReset = false) {

    if (status === action.STATUS.NEW) {
        a.stats = { ...a.stats, remainingHealth: a.stats.health };
        d.stats = { ...d.stats, remainingHealth: d.stats.health };
    } else if (noMobReset) {
        a.stats = { ...a.stats, remainingHealth: a.stats.health };
    }


    for (i = 0; i < battle.maxRounds; i++) {
        d.stats = { ...d.stats, remainingHealth: d.stats.remainingHealth - damageFormula(a, d) };
        if (d.stats.remainingHealth <= 0) return { end: true, win: true };
        a.stats = { ...a.stats, remainingHealth: a.stats.remainingHealth - damageFormula(d, a) };
        if (a.stats.remainingHealth <= 0) return { end: true, win: false };
    }

    return { end: false, win: false };

}

function applyEquipMod(p) {
    Object.keys(p.equip).forEach(e => {
        p.stats = applyMods(p.stats, e.mods);
    })
}

function test(a, d, s) {
    //initial setup
    if (s === action.STATUS.NEW) {
        applyEquipMod(a);
        a.stats = { ...a.stats, remainingHealth: a.stats.health };
        d.stats = { ...d.stats, remainingHealth: d.stats.health };
    } else if (noMobReset) {
        a.stats = { ...a.stats, remainingHealth: a.stats.health };
    }

    //procs & effect management

    //damage calculation
    d.stats = { ...d.stats, remainingHealth: d.stats.remainingHealth - damageFormula(a, d) };
    if (d.stats.remainingHealth <= 0) return { end: true, win: true };
    a.stats = { ...a.stats, remainingHealth: a.stats.remainingHealth - damageFormula(d, a) };
    if (a.stats.remainingHealth <= 0) return { end: true, win: false };
    
    //move tick forward for effects
    if (a?.effects) {
        a.effects.forEach((e, idx) => {
            e.ticks--;
            executeEffect(e);
            if (!e.ticks)
                e = null;
        })
    }
}

module.exports = {
    test,
    fight
}