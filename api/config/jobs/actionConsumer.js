const { Op } = require("sequelize");
const { Player } = require("../models/Player");
const { Inventory } = require("../models/Inventory");
const { Item } = require("../models/Item");
const {action} = require("../../bin/constants")

const actionFn = {
  battling: {
    fn: battlingAction,
  }
}

function generateNewBattle(p) {

}

function processFight(p, a = null) {

}

function battlingAction(p) {
  if (p.a[0].status === action.STATUS.NEW) {
    generateNewBattle(p);
  }
  processFight(p);
  p.save();
}

async function actionConsumer() {
  let actions = await Player.findAll({where: {
    action: {
      [Op.not]: null,
    }
  }, include: [{model: Inventory, include: [{model: Item}]}],
  attributes: {exclude: ['password']}});

  actions.forEach((a) => {
  })

  // wait for a promise to finish
  console.log("action consumed");
  return new Date(Date.now() + 6000);

};

module.exports = actionConsumer;