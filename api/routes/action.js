var express = require('express');
var router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { Action } = require('../config/models/Action');
const { Player } = require('../config/models/Player');
const { action } = require('../bin/constants');
const { Inventory } = require('../config/models/Inventory');
const mh = require('../bin/mapHandler');
const { Item } = require('../config/models/Item');

router.use(verifyToken);

async function refreshActions(req, res, next) {
    let p = await Player.findOne({ where: { id: req.player.id }, attributes: ["currentActions", "stats"] });
    p.currentActions = p.stats.maxAction;
    p.save();
    res.status(200).send(p.stats.maxAction);
}

router.get('/last', async function (req, res, next) {
    let p = await Player.findOne({ where: { id: req.player.id }, include: [{ model: Action, as: "lastAction" }, { model: Inventory }], attributes: { exclude: ["password", "channels", "messages", "mail"] } });
    console.log(p);
    res.json(p);
});

router.get('/refresh', refreshActions);

router.get('/gather/:type', async function (req, res, next) {
    let { type } = req.params;

    let Atype = action.GATHERING_SUB[type] ?? null;
    if (!Atype) {
        return res.status(400).send(`${type} is not a valid type.`);
    }

    Action.create({
        type: action.GATHERING,
        status: action.STATUS.NEW,
        data: { type: Atype },
        playerId: req.player.id,
    });

    res.status(200).send(type);
})

router.get('/attack', async function (req, res, next) {
    let ids = await Player.findAll({
        attributes: ["id"],
    })
    ids.forEach((p) => {
        Action.create({
            type: action.BATTLING,
            status: action.STATUS.NEW,
            data: {},
            playerId: p.id,
        });

    })
    res.status(200).send({ message: "success" });
})

router.post('/equip/:id', async function (req, res, next) {
    let it = await Item.findOne({ where: { ownerId: req.player.id, id: req.params.id } });

    if (it) {
        if (it.equipped) {
            it.equipped = false;
            it.save();
            return res.status(200).json({ message: "unequipped item " + req.params.id.toString() });
        }

        let equipped = await Item.findAll({ where: { ownerId: req.player.id, equipped: true } });
        equipped.forEach((equip) => {
            if (equip.type === it.type) {
                equip.equipped = false;
                equip.save();
            }
        })
        it.equipped = true;
        it.save();
        return res.status(200).json({ message: "equipped item " + req.params.id.toString() });
    }
    res.status(400).send("Nope.");
})

router.get('/testinv', async function (req, res, next) {
    let p = await Player.findOne({
        include: [{ model: Inventory }]
    })
    p.inventories[0].others = { test: 1234 };
    await p.inventories[
        0
    ].save();
    res.status(200).send({ message: "success" });
})

router.get('/move', async function (req, res, next) {
    let pl = await Player.findOne({ where: { id: req.player.id }, attributes: ["pos"] });
    let d = req.body.destination;
    let p = mh.moveActionBuildPath(pl.pos, d);

    res.status(200).json(p);
})

module.exports = router;