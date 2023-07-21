var express = require('express');
var router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { Action } = require('../config/models/Action');
const { Player } = require('../config/models/Player');
const { action } = require('../bin/constants');
const { Inventory } = require('../config/models/Inventory');
const mh = require('../bin/mapHandler');

router.use(verifyToken);

router.get('/last', async function(req, res, next) {
    let p = await Player.findOne({where: {id: req.player.id}, include: [{model: Action, as: "lastAction"}, {model: Inventory}], attributes: { exclude: ["password", "channels", "messages", "mail"]}});
    console.log(p);
    res.json(p);
});

router.get('/refresh', async function(req, res, next) {
    let p = await Player.findOne({where: {id: req.player.id}, attributes: ["currentActions", "stats"]});
    p.currentActions = p.stats.maxAction;
    p.save();
    res.status(200).send(p.stats.maxAction);
});

router.get('/test', async function(req, res, next) {
    let ids = await Player.findAll({attributes: ["id"],
    })
    ids.forEach((p) => {
        Action.create({
            type: "battling",
            status: action.STATUS.NEW,
            data: {},
            playerId: p.id,
          });
        
    })
    res.status(200).send({message: "success"});
})

router.get('/testinv', async function(req, res, next) {
    let p = await Player.findOne({include: [{model: Inventory}]
    })
    p.inventories[0].others = {test: 1234};
    await p.inventories[
        0
    ].save();
    res.status(200).send({message: "success"});
})

router.get('/move', async function(req, res, next) {
    let pl = await Player.findOne({where: {id: req.player.id}, attributes: ["pos"]});
    let d = req.body.destination;
    let p = mh.moveActionBuildPath(pl.pos, d);

    res.status(200).json(p);
})

module.exports = router;