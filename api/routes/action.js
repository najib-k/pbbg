var express = require('express');
var router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { Action } = require('../config/models/Action');
const { Player } = require('../config/models/Player');

router.use(verifyToken);

router.get('/last', async function(req, res, next) {
    let p = await Player.findOne({where: {id: req.player.id}, include: [{model: Action, as: "lastAction", required: true}], attributes: { exclude: ["id", "password", "channels", "messages", "mail"]}});

    res.json(p ? p : {idle: true});
});

module.exports = router;