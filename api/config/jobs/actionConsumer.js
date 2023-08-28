const { Op } = require("sequelize");
const { Player } = require("../models/Player");
const { Inventory } = require("../models/Inventory");
const { Item } = require("../models/Item");
const { action, move } = require("../../bin/constants");
const { spawnFromTile, generateDrops, generateRessource } = require("../../bin/spawnHandler");
const { Action } = require("../models/Action");
const { fight } = require('../../bin/battleHandler');
const { traverseTile, getTile } = require('../../bin/mapHandler');
const { stringify } = require("querystring");
const { getRandomInt } = require("../../bin/utils");
const { setFlagsFromString } = require("v8");

const actionFn = {
    [action.BATTLING]: {
        fn: battlingAction,
    },
    [action.MOVING]: {
        fn: movingAction,
    },
    [action.GATHERING]: {
        fn: gatheringAction,
    }
}

function setLastAction(p) {
    if (p.lastAction) {
        p.lastAction.lastActionPlayerId = null;
        p.lastAction.save();
    }
    
    p.actions[0].lastActionPlayerId = p.id;
    p.actions[0].save();
}

async function gatheringAction(p) {
    setLastAction(p);
    let r = generateRessource(p.actions[0].data.type);
    p.inventories[0].others = {...p.inventories[0].others, [r.name]: (p.inventories[0].others[r.name] || 0) + r.amount}
    p.actions[0].data = {...p.actions[0].data, gathered: r};
    if (p.actions.length > 1) {
        p.actions[0].status = action.STATUS.COMPLETED;
    }
    saveAction(p);
}

async function saveAction(p) {
    p.inventories[0].save();
    //console.log(p.inventories[0])
    p.actions[0].save();
    p.save();
}

function moveIsCombat(pos, p) {
    let c = {
        status: action.STATUS.NONE,
        data: {},
    }

    let t = getTile(pos);
    let cb = t.pass / (move.danger ** t.danger);

    if (cb >= getRandomInt(100)) {
        c.status = action.STATUS.NEW;
        c.data = generateNewBattle(p);
    }

    return c;
}

async function movingAction(p) {
    let { pass, index, path, loot, combat, tries } = p.actions[0].data;

    setLastAction(p);

    if (p.actions[0].status === action.STATUS.NEW) {
        combat = moveIsCombat(path[index], p);
        p.actions[0].status = action.STATUS.RUNNING;
    }

    let cBuff = false;
    if (combat.status !== action.STATUS.NONE) {
        if (combat.status === action.STATUS.COMPLETED) {
            combat.data = generateNewBattle(p);
            combat.status = action.STATUS.NEW;
        }
        let { end, win, status, finalData } = processBattle(p, { ennemy: combat.data.ennemy, status: combat.status }, true);

        if (end) {
            if (win) {
                cBuff = true;
                combat.status = action.STATUS.COMPLETED;
                loot.push(finalData?.droplog || []);
            }
        } else {
            combat.status = action.STATUS.RUNNING;
            tries++;
            p.actions[0].data = { pass, index, path, loot, combat, tries };
            saveAction(p);
            return;
        }
    }

    let moveData = traverseTile(path[index], tries, cBuff);

    if (moveData) {
        pass++;

        //tile traversed, move towards next
        if (pass === move.defaultPass) {
            p.pos = path[index];
            index++;

            //it was last tile, destination reached.
        }
        if (index === path.length) {
            p.actions[0].status = action.STATUS.COMPLETED;
        } else {
            p.actions[0].status = action.STATUS.NEW;
        }
    }

    p.actions[0].data = { pass, index, path, loot, combat, tries };

    saveAction(p);
    //console.log("Final infos: \n", p.actions[0].status, " move. ");
}

function generateNewBattle(p) {
    let b = {
        ennemy: spawnFromTile(p),
        pTurn: true,
    };

    //console.log("stats", JSON.stringify(b));
    return b;
    //  p.actions[0].save();
}

async function newMovingAction(p, path) {
    let a = await Action.create({
        type: "moving",
        status: action.STATUS.NEW,
        data: {
            path, //[pos] array of tiles pos
            tries: 0, //failed attempts for current tile, increase % of passing
            index: 0, //currently traversing path[x]
            pass: 0,  //step in current tile until completely traversed
            loot: [],  //loot generated (kind of a log)
            combat: { //if combat then info on that 
                status: action.status.NONE, //none means current pass didnt generate combat
                data: {}, //combat data
            },
        },
        playerId: p.id,
    })
}

async function newBattleAction(p) {

    let a = await Action.create({
        type: "battling",
        status: action.STATUS.NEW,
        data: {},
        playerId: p.id,
    });

}

/**
 * 
 * @param {object} e Ennemy slain to generate drops from.
 * @param {object} inv inventory to save drops to.
 * @returns {object[]} a log of everything dropped this run.
 */
async function processDrops(e, inv, ownerId) {
    let d = generateDrops(e, inv.id, ownerId);
    let droplog = [];

    d.forEach((i) => {
        let { uuid, amount, ...info } = i;
        if (amount === 0) return;
        if (uuid) {
            Item.create({...info});
            droplog.push({ i });
        }
        else {
            let others = inv.others;
            let { [i.id]: base = 0 } = others;
            droplog.push({ i });
            inv.others = { ...others, [i.id]: amount + base };
        }
    })
    return droplog;

}

/**
 * Process battle down to drops, then sends back all the information to be used depending on action type.
 * @param {Player} p p infos
 * @param {object} a standalone action 
 * @returns {object} {win, status}
 */
function processBattle(p, options = {}, noMobReset = false) {
    let { data, data: { ennemy }, status } = p.actions[0];
    let { end, win } = fight(p, options?.ennemy || ennemy, options?.status || status, noMobReset);
    let finalData = null;
    if (end) {
        if (win) {
            console.log("won, gennerating drop");
            finalData = { ...data, droplog: processDrops(ennemy, p.inventories[0], p.id) };
        }
        return { win, end, status: action.STATUS.COMPLETED, finalData };
    } else {
        return { win, end, status: action.STATUS.RUNNING, finalData };
    }
}

async function battlingAction(p) {
    setLastAction(p);

    if (p.actions[0].status === action.STATUS.NEW) {
        p.actions[0].data = generateNewBattle(p);
    }

    let { finalData, status } = processBattle(p);

    p.actions[0].status = status;
    p.actions[0].data = { ...finalData };
    if (p.actions[0].status === action.STATUS.COMPLETED) {
        if (p.actions.length <= 1) {
            newBattleAction(p);
        }
    }

    saveAction(p);
    //console.log("Final inventory\n", JSON.stringify(p.inventories[0]));
}

async function actionConsumer() {
    let nextTick = new Date(Date.now() + 6000);
    let ps = await Player.findAll({
        where: {
            currentActions: {
                [Op.gt]: 0,
            }
        }, include: [{ model: Action, as: 'actions', required: true, where: { status: { [Op.notLike]: action.STATUS.COMPLETED } } }, { model: Action, as: 'lastAction' }, { model: Inventory, include: [{ model: Item, as: "uuids" }] }],
        attributes: { exclude: ['password'] }
    });


    ps.forEach(async (p) => {
        p.currentActions -= 1;
        await actionFn[p.actions[0].type].fn(p);
    })

    // wait for a promise to finish
    console.log("actions consumed");
    return nextTick;

};

module.exports = actionConsumer;