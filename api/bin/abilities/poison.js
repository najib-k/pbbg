const { battle, damageTypes } = require("../constants");
const { getRandomInt } = require("../utils");


/**
 * id: 0
 * @param {*} t 
 * @param {*} c 
 * @param {*} e 
 * @param {*} options
 */
function poison({caster, effect, target = null, ...options }) {
    const dot = [0.01, 0.01, 0.02, 0.02, 0.03];
    const element = [damageTypes.toxic];
    const name = "poison";
    const tickRate = [5,5,4,4,3];
    const proc = [25, 25, 30,30,40];
    
    const { ftick = 0, remove = false, log, type = "none" } = options;
    const {tier = 0, potency = 1, parent = null} = effect;

    const attackEffect = {
        name: "poison",
        stacks: 5,
        nextTick: ftick + tickRate[tier],
        handlers: [battle.handlers.onTick],
        run: "poison",
        caster,
        target,
        parent: effect,
        tier,
        element,
        effectType: [battle.effectTypes.dot]
    }

    if (type === battle.handlers.onAttack) {
        if (getRandomInt(100) > proc[tier]) {
            return;
        }
        effect.active = false;
        log.push({from: target, type: battle.logType.effect, effect: attackEffect })
    }
    else if (type === battle.handlers.onTick && effect.nextTick === ftick) {
        const {target} = effect; //could also be caster since the effect belongs to the caster and also has its own target embedded
        let value = Math.ceil(target.stats.health * dot[tier]);
        
        effect.nextTick = ftick + tickRate[tier];
        log.push({from: target, type: battle.logType.damage, value, effect})
        if (!effect.permanent) {
            effect.stacks--;
            if (!effect.stacks) {
                effect.active = false;
                parent.active = true;
                log.push({from: target, type: battle.logType.effectEnd, effect });
            } else {
                log.push({from: target,type: battle.logType.effectStack, effect});
            }
        }
    }

    return;
}

module.exports = poison;