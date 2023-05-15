var express = require('express');
const { verifyToken } = require("../middleware/auth");
const { Player } = require("../config/models/Player");
var router = express.Router();

/* GET users listing. */
router.get('/', verifyToken, async function (req, res, next) {
  Player.findOne({where: {id: req.player.id}, attributes: {exclude: ['password']},}).then((player) => {
    res.status(200).send({
      player,
    });
  });

});

module.exports = router;
