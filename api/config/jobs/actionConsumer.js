const { Op } = require("sequelize");
const { Player } = require("../models/Player");
const { Inventory } = require("../models/Inventory");
const { Item } = require("../models/Item");
const {action} = require("../../bin/constants");
const { spawnFromTile, generateDrops } = require("../../bin/spawnHandler");
const { Action } = require("../models/Action");
const { fight } = require('../../bin/battleHandler');
const { stringify } = require("querystring");

const actionFn = {
  battling: {
    fn: battlingAction,
  }
}

async function generateNewBattle(p) {
  let b = {
    ennemy: spawnFromTile(p),
    pTurn: true,
  };

  //console.log("stats", JSON.stringify(b));
  p.actions[0].data = b;
//  p.actions[0].save();
}

async function newBattleAction(p) {

  let a =  await Action.create({
    type: "battling",
    status: action.STATUS.NEW,
    data: {},
    playerId: p.id,
  });

}

async function processDrops(p) {
  let d = generateDrops(p.actions[0].data.ennemy.drop);

  d.forEach((i) => {
    let {uuid, amount, ...info} = i;
    if (amount === 0) return;
    if (uuid) {
      Item.create({inventoryId: p.inventories[0].id, ...info});
    }
    else {
      let others = p.inventories[0].others;
      let { [i.id]: base = 0} = others;
      p.inventories[0].others = {...others, [i.id]: amount + base};
    }
  })
  
}

function processBattle(p, a = null) {
  r = fight(p, p.actions[0].data.ennemy, p.actions[0].status);
  if (r.end) {
    p.actions[0].status = action.STATUS.COMPLETED;
    if (r.win) {
      console.log("won, gennerating drop");
      processDrops(p);
    }
  } else {    
    p.actions[0].status = action.STATUS.RUNNING;
  }
}

async function battlingAction(p) {
  //p.currentActions -= 1;
  if (p.lastAction) p.lastAction.lastActionPlayerId = null;
  p.actions[0].lastActionPlayerId = p.id;
  if (p.actions[0].status === action.STATUS.NEW) {
    await generateNewBattle(p);
  }
  processBattle(p);
  if (p.actions[0].status === action.STATUS.COMPLETED) {
    if (p.actions.length <= 1) {
      await newBattleAction(p);
    }
  }
  await p.inventories[0].save();
  await p.actions[0].save();
  await p.save();
  console.log("Final infos: \n", p.actions[0].status, " inventory\n", JSON.stringify(p.inventories[0]));
}

async function actionConsumer() {
  let ps = await Player.findAll({where: {
    currentActions: {
      [Op.gt]: 0,
    }
  }, include: [{model: Action, as: 'actions' , required: true, where: { status: {[Op.notLike]: action.STATUS.COMPLETED}}}, {model: Action, as: 'lastAction'}, {model: Inventory, include: [{model: Item}]}],
  attributes: {exclude: ['password']}});

  //console.log(`Recovered: ${JSON.stringify(ps)}`);

  ps.forEach(async (p) => {
    console.log("invent at start: ", JSON.stringify(p.inventories[0]))
    await actionFn[p.actions[0].type].fn(p);
  })

  // wait for a promise to finish
  console.log("actions consumed");
  return new Date(Date.now() + 6000);

};

module.exports = actionConsumer;