var express = require('express');
const {verifyToken} = require("../middleware/auth");
const {Player} = require("../config/models/Player");
var router = express.Router();

/* GET users listing. */
router.get('/', verifyToken, async function(req, res, next) {
  res.send({
    players: await Player.findAll()
  });
});

module.exports = router;
