var express = require('express');
const { verifyToken } = require("../middleware/auth");
const { Player } = require("../config/models/Player");
var router = express.Router();

router.use(verifyToken);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  Player.findOne({where: {id: req.player.id}, attributes: {exclude: ['password']},}).then((player) => {
    res.status(200).send({
      player,
    });
  });

});

module.exports = router;
