const { Op } = require("sequelize");
const { Player } = require("../models/Player");
const { Inventory } = require("../models/Inventory");
const { Item } = require("../models/Item");
const {action} = require("../../bin/constants");
const { spawnFromTile } = require("../../bin/spawnHandler");
const { Action } = require("../models/Action");
const { fight } = require('../../bin/battleHandler');

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

  p.actions[0].data = b;
  p.actions[0].save(); 
  (p.actions || (p.actions = [])).push(a);
}

async function newBattleAction(p) {

  let a =  await Action.create({
    type: "battling",
    status: action.STATUS.NEW,
    data: {},
    player: p,
  });

  (p.actions || (p.actions = [])).push(a);
}

function processBattle(p, a = null) {
  r = fight(p, p.action[0].data.ennemy, p.action[0].status);
  if (end) {
    p.action[0].status = action.STATUS.COMPLETED;
  } else {    
    p.actions[0].status = action.STATUS.RUNNING;
  }
}

async function battlingAction(p) {
  //p.currentActions -= 1;
  if (p.actions[0].status === action.STATUS.NEW) {
    await generateNewBattle(p);
  }
  processBattle(p);
  p.lastAction = p.actions[0];
  if (p.actions[0].status === action.STATUS.COMPLETED) {
    if (p.actions.length > 1) {
      p.actions = p.actions.slice(1);
    } else {
      p.actions = [await newBattleAction(p)];
    }
  }
  p.save();
}

async function actionConsumer() {
  let ps = await Player.findAll({where: {
    currentActions: {
      [Op.gt]: 0,
    }
  }, include: [{model: Action, as: "actions", required: true}, {model: Inventory, include: [{model: Item}]}],
  attributes: {exclude: ['password']}});

  ps.forEach((p) => {
    actionFn[p.actions[0].type].fn(p);
  })

  // wait for a promise to finish
  console.log("action consumed");
  return new Date(Date.now() + 6000);

};

module.exports = actionConsumer;