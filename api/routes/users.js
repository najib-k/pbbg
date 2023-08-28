var express = require('express');
const { verifyToken } = require("../middleware/auth");
const { Player } = require("../config/models/Player");
const { Inventory } = require('../config/models/Inventory');
const { Item } = require('../config/models/Item');
const { Action } = require('../config/models/Action');
var router = express.Router();

router.use(verifyToken);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  Player.findOne({ where: { id: req.player.id }, attributes: { exclude: ['password'] }, }).then((player) => {
    res.status(200).send({
      player,
    });
  });

});

router.get('/inventory', async function (req, res, next) {
  Inventory.findAll({where: { playerId: req.player.id }, include: [{ model: Item}], order: [[{model: Item, as: "uuids"},"equipped", "DESC"], [{model: Item, as: "uuids"}, "createdAt", "DESC"]]})
    .then((invents) => {
      if (invents)
        res.status(200).json(invents[0]);
      else
        res.status(400).send("Not found.");
    })
})

router.get('test/inventory', async function (req, res, next) {
  Inventory.findAll({ where: { playerId: req.params.id }, include: [{ model: Item }] })
    .then((invents) => {
      if (invents)
        res.status(200).json(invents[0]);
      else
        res.status(400).send("Not found.");
    })
})

router.get('/actions', async function(req, res, next) {
  Action.findAll({where : {playerId: req.player.id}}).then((actions) => actions ? res.status(200).json(actions) : res.status(400).send("no actions"));
  
})

module.exports = router;
