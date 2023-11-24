const { battle } = require("../constants");
const { damageFormula } = require("../formulaHandler");

function basic({caster, target, ...options}) {
    const {log} = options;
    const attackEffect = {
        name: "basic attack",
        caster,
        target,
        effectType: [battle.effectTypes.ability, battle.effectTypes.melee],
    }

    log.push({from: target, type: battle.logType.damage, value: damageFormula(caster, target, attackEffect), effect: attackEffect});    
}

module.exports = basic;