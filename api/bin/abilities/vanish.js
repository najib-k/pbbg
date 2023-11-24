const { battle } = require("../constants");
const { getRandomInt } = require("../utils");

/**
 * tier% chance to divide dmaage received by 2, has cooldown.
 * @param {*} param0 
 * @returns 
 */
function vanish({target = null, caster, effect, ...options}) {
    const proc = [10, 10, 15, 20, 30];
    const cd = [15, 12, 10, 8, 5];
    const {tier = 0, ftick, log} = options;
    const {cooldown = 0} = effect;
    const name = "vanish";


    if (getRandomInt(100) <= proc[tier] && ftick >= cooldown) {
            target.damageMod.push({op: "/", value: 2, stacks: 1, target: [caster.id], on: [battle.effectTypes.ability]})
            effect.cooldown = ftick + cd[tier];
            //insert damage reduced event into log
            effect.caster = caster;
            effect.target = target;
            effect.name = name;
            log.push({type: battle.logType.activation, effect, details: `reducing damage by 50%`, from: caster});
       }
}

module.exports = vanish;