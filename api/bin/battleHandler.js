const { abilities, runAbility } = require('./abilities/index');
const { damageFormula, applyMods, applyModsToStats, hitFormula, modFn } = require('./formulaHandler');
const { battle, action, battle: { handlers, tree } } = require('./constants');
const { getRandomInt } = require('./utils');
const keywords = require('./keywords');
const { selectTargetEnnemyAny } = require('./abilities/utils');
const _ = require('lodash');

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

/**
 * Adds effects to the correct handlers in a profile.
 * Adds target & caster ids if provided.
 * @param {*} effects list of effects to add
 * @param {*} profile combat profile to apply effects on
 * @param {*} options {caster, target, permanent}
 */
function addHandlers(effects, profile, options) {
    effects.forEach(eff => {
        eff.handlers.forEach((onEvent) => profile[onEvent].push({ ...eff, ...options }));
    });
}

/**
 * 
 * @param {player|monster} base Player or monster raw data.
 * @param {Item} objs list of equipped objects.
 * @returns battling profile.
 */
function battlingProfile(base, objs = []) {
    let { stats, name, lvl, tree } = base;
    let profile = {
        stats,
        tree, // original
        ftree: _.cloneDeep(tree),//copy,  modifiable
        wpkw: [],
        name,
        lvl,
        changeLog: [],
        damageMod: [],
        chunk: battle.defaultChunk,
        [handlers.onAttack]: [], // activate on A
        [handlers.onDefense]: [], // activate on D
        [handlers.onRound]: [], // run at the beginning of a new round
        [handlers.onTick]: [], //  every tick
        [handlers.onChunk]: [], // every chunk
        [handlers.onDefHit]: [], // every chunk
        [handlers.onDodge]: [], // every chunk
        [handlers.onAttHit]: [], // every chunk
        [handlers.onHpGain]: [], // every chunk
        [handlers.onHpLoss]: [], // every chunk
        [handlers.onStart]: [], // every chunk
        [handlers.onDeath]: [], // every chunk
        [handlers.onMiss]: [],

    }

    // Apply all objects modifiers and luck based effects/buffs/debuffs
    objs.forEach((o) => {
        const { affixes = [], keywords: kws = [] } = o;
        affixes.forEach((aff) => {
            let { mod = {} } = aff;
            profile.stats = applyModsToStats(profile.stats, mod);
        });

        kws.forEach(kw => {
            let { effects = [] } = kw;
            addHandlers(effects, profile, { permanent: true });

            //get a list of equipped wps
            if (Object.keys(keywords.weaponTypes).includes(kw.type)) // 2/3/4 = mel/rgd/cst
            {
                wpkw.push(kw);
            }
        })

    });

    //TODO: parse through equipped passives
    profile.stats.remainingHealth = profile.stats.health;

    return profile;
}

/**
 * Run effects for a certain handler type (onRound/OnTick....)
 * 
 * @param {*} order 
 * @param {*} groups 
 * @param {*} type 
 */
function handleEffects(order, groups, type, ftick, target = null, log) {
    order.forEach((caster) => {
        if (caster[type]) {
            caster[type].forEach((effect, idx) => {
                let { active = true } = effect;
                if (active) {
                    runAbility(effect.run, { target, caster, effect, type, ftick, groups, log });
                } else {
                    //console.log(`[DEBUG]: ${effect.name} inactive`)
                }
            })
        }
    })
}

function getOrder(groups) {
    let order = groups.flat(2)
        .sort((a, b) => {
            return a.stats?.initiative - b.stats?.initiative
        });
    return order;
}

/**
 * Handles logic to set next tree node.
 */
function moveTree(caster) {
    let { tree, ftree } = caster;

    //if next == null then start over from original tree, we hit the bottom.
    caster.ftree = ftree.next ?? _.cloneDeep(tree);

}

function changelogActivation({ type, effect, details = "" }, caster, battleLog) {
    battleLog.push({ type, message: `${caster.name} uses [${effect.name}] ${details}` });
}

function changelogEffect({ type, effect }, caster, battleLog) {
    effect.handlers.forEach((onEvent) => {
        effect.target[onEvent].push(effect);
    });
    battleLog.push({ type, message: `${effect.target.name} received ${effect.stacks} stacks of [${effect.name}] from ${effect.caster.name}` });
}

function changelogEffectEnd({ type, effect }, caster, battleLog) {
    battleLog.push({ type, message: `[${effect.name}] ended on ${effect.target.name}.` })
}

function changelogDamage({ type, effect, value }, caster, battleLog) {
    caster.stats.health -= value;
    battleLog.push({ type, message: `${effect.target.name} took ${value} dmg from ${effect.caster.name}\'s [${effect.name}]` })
    if (caster.stats.health <= 0) {
        caster.dead = true;
        battleLog.push({ type, message: `${effect.caster.name} killed ${effect.target.name}` });
    }
}


function changelogEffectStack({ type, effect }, caster, battleLog) {
    battleLog.push({ type, message: `${effect.stacks} stacks of ${effect.name} left on ${caster.name}` })
}

function changelogMod({ type, stats, effect }, caster, battleLog) {
    battleLog.push({
        type, message: `${effect.name} grants ${Object.keys(stats).map(k => {
            caster.stats[k] += stats[k];
            return `${stats[k] > 0 ? "+" + stats[k] : stats[k]}`;
        }).join("|")} to ${caster.name}`
    });
}

function processChangelog(turnLog, battleLog) {
    const logFn = {
        [battle.logType.effect]: changelogEffect,
        [battle.logType.effectEnd]: changelogEffectEnd,
        [battle.logType.activation]: changelogActivation,
        [battle.logType.damage]: changelogDamage,
        [battle.logType.effectStack]: changelogEffectStack,
        [battle.logType.mod]: changelogMod,
    }

    turnLog.forEach(({ from: caster, ...log }) => {
        logFn[log.type](log, caster, battleLog);
        caster.damageDefMod = caster.damageMod.filter(mod => mod.stacks > 0);
    });
}

function processTurn(order, groups, battleLog, ftick) {
    order.forEach((caster) => {
        const { nextTree = 0, ftree, dead = false } = caster;
        let log = [];
        if (dead) return;
        let target = selectTargetEnnemyAny(caster, groups);
        if (nextTree === ftick) {
            let hit = hitFormula({ caster, target });
            //move to next node, trigger at ftick + duration
            if (hit) {
                const { run = battle.defaultAttack, ability = {} } = ftree;
                handleEffects([caster], groups, handlers.onAttack, ftick, target, log);
                handleEffects([target], groups, handlers.onDefense, ftick, caster, log); //passing caster to apply target defense effect
                runAbility(run, { caster, target, ability, type: handlers.onAttack, ftick, groups, log });
            } else {
                battleLog.push({ type: battle.logType.miss, message: `${caster.name} missed${target.name} using ${ftree.run}` })
                handleEffects([target], groups, handlers.onDodge, ftick, target, log);
                handleEffects([caster], groups, handlers.onMiss, ftick, target, log);
            }
            caster.nextTree = ftick + ftree.duration;
            moveTree(caster);
        }
        processChangelog(log, battleLog)
        log = [];
    });
}

function updateGroups(groups) {
    return groups.map(g => g.filter(p => !p.dead)).filter(g => g.length != 0);
}

function idProfiles(groups) {
    let id = 0;
    groups.forEach((g, idx) => g.forEach((p) => {
        p.id = id++;
        p.gid = idx;
    }));
}


function test(groups, status) {
    //initial setup
    idProfiles(groups);

    let battleLog = [];
    let gtick = 0;

    order = getOrder(groups);
    let log = [];
    handleEffects(order, groups, handlers.onStart, 0, null, log)
    for (round = 0; round < battle.maxRounds && groups.length > 1; round++) {
        battleLog.push({ type: battle.logType.round, message: "Round " + round })
        handleEffects(order, groups, handlers.onRound, 0, null, log)
        for (ftick = 0; ftick < battle.maxTicks && groups.length > 1; ftick++) {
            battleLog.push({ type: battle.logType.ftick, message: `- ${ftick} -` })

            handleEffects(order, groups, handlers.onTick, ftick + gtick, null, log)
            handleEffects(order.filter((p) => ftick % p.chunk === 0), groups, handlers.onChunk, ftick + gtick, null, log)

            //damage calculation
            processChangelog(log, battleLog)
            processTurn(order, groups, battleLog, ftick + gtick);
            groups = updateGroups(groups);
            log = [];

        }
        order = getOrder(groups);
        gtick += ftick;
    }

    return { groups, battleLog };
}

module.exports = {
    test,
    fight,
    battlingProfile,
}