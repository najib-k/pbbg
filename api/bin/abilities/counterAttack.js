const { battle } = require("../constants");
const { getRandomInt } = require("../utils");

function counterAttack({caster, effect, target = null, ...options }) {
    const proc = [120, 15, 20, 25, 30];
    const buff = [1.2, 1.3, 1.5, 1.7, 2]
    const {stacks = 0, tier = 0} = effect;
    const { log, type } = options;
    const name = "Counter Attack";
    effect.name = name;

    if (type === battle.handlers.onDodge) {
        if (getRandomInt(100) <= proc[tier]){
            effect.stacks = stacks + 1;
            log.push({type: battle.logType.effectStack, effect, from: caster});
        }
    }

    if ( type === battle.handlers.onAttack && stacks > 0) {
        effects.stacks = stacks - 1;
        log.push({type: battle.logType.effectStack, effect, from: caster});
        caster.damageMod.push({op: '*', value: buff[tier], stacks: 1, on: [battle.effectTypes.ability], target: [target.id]});
    }
}

module.exports = counterAttack;