const { damageFormula } = require('./formulaHandler');
const { battle, action } = require('./constants');

function fight(a, d, status) {
    if (status === action.STATUS.NEW) {
        a.stats.remainingHealth = a.health;
        d.stats.remainingHealth = d.health;
    }

    for (i = 0; i < battle.maxRounds; i++ ) {
        a.stats.remainingHealth -= damageFormula(a, d);
        if (a.stats.remainingHealth <= 0) return {a, d, end: true, win: true};
        d.stats.remainingHealth -= damageFormula(d, a);
        if (d.stats.remainingHealth <= 0) return {a, d, end: true, win: false};
    }

    return {a, d, end: false, win: false};

}

module.exports = {
    fight,
}