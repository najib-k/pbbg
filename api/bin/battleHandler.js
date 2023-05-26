const { damageFormula } = require('./formulaHandler');
const { battle, action } = require('./constants');

function fight(a, d, status) {

    if (status === action.STATUS.NEW) {
        a.stats = {...a.stats, remainingHealth: a.stats.health};
        d.stats = {...d.stats, remainingHealth: d.stats.health};
    }


    for (i = 0; i < battle.maxRounds; i++ ) {
        d.stats = {...d.stats, remainingHealth: d.stats.remainingHealth - damageFormula(a, d)};
        if (d.stats.remainingHealth <= 0) return {end: true, win: true};
        a.stats = {...a.stats, remainingHealth: a.stats.remainingHealth - damageFormula(d, a)};
        if (a.stats.remainingHealth <= 0) return {end: true, win: false};
    }

    return {end: false, win: false};

}

module.exports = {
    fight,
}