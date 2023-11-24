const { battle } = require("../constants");

/**
 * id: 0
 * @param {*} t 
 * @param {*} c 
 * @param {*} e 
 * @param {*} options
 */
function elusiveStep({ target = null, caster, effect, ...options }) {
    const name = "elusiveStep";
    const evasion = [10, 15, 15, 15, 20];
    const duration = [5, 5, 7, 10, 12];
    const {ftick = 0, remove = false, type, log} = options;
    const {tier = 0, potency = 1, parent = null} = effect;
    const attackEffect = {
        name: "esBuff",
        stacks: 1,
        nextTick: ftick + duration[tier],
        handlers: [battle.handlers.onTick],
        caster,
        tier,
        parent: effect,
        run: elusiveStep,
        effectType: [battle.effectTypes.buff],
    }

    if (parent === null) {
        effect.active = false;
        log.push({from: caster, type: battle.logType.mod, stats: {evasion: evasion[tier]}, effect: attackEffect})
        log.push({from: caster, type: battle.logType.effect, effect: attackEffect})
    }
    else if (ftick === effect.nextTick) {
        if (!effect.permanent) {
            effect.stacks--;
            if (!effect.stacks) {
                effect.active = false;
                parent.active = true;
                log.push({from: caster, type: battle.logType.mod, stats: {evasion: -evasion[tier]}, effect})
                log.push({from: caster,  type: battle.logType.effectEnd, effect });
            }
        }
    }
}

module.exports = elusiveStep;