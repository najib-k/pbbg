var express = require('express');
const { Player } = require("../config/models/Player");
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const _ = require('lodash');
const { PlayerChannels } = require('../config/models/PlayerChannels');
var router = express.Router();
const constants = require('../bin/constants');
const { Channel } = require('../config/models/Channel');
const { Message } = require('../config/models/Message');
const { orderByDate } = require('./routeUtils');

/* GET home page. */
async function initChannels(playerId) {
  let channels = constants.chatChannels.map((c, index) => { return { playerId, channelId: index + 1 } });
  await PlayerChannels.bulkCreate(channels);
}

router.post('/register', async function (req, res, next) {
  const body = req.body;

  // if no mail or password then bad request
  if (!(body.name && body.mail && body.password))
    return res.status(400).send({ error: "Invalid Parameter" });

  //Find user if exists
  Player.findOne({
    where: {
      [Op.and]: [
        { name: body.name },
        { mail: body.mail }]
    }
  }).then((exists) => {

    //if it does throw error
    if (exists)
      return res.status(400).send({ error: "User already exists." });

    //hash password
    bcrypt.hash(body.password, 10, async function (err, hash) {
      if (err) {
        return res.status(400).send({ error: "Error during account creation, please contact an admin." });
      }
      const player = await Player.create({
        name: req.body.name, mail: req.body.mail, password: hash,
        stats: {...constants.user.default.stats},
        action: null,
        inventory: [await Inventory.create({others: {}})]
      });

      // Create relation to basic chat channels, passing only player.id newly created
      await initChannels(player.id);

      //send back valid JWT
      const accessToken = jwt.sign({
        name: player.name,
        id: player.id
      }, process.env.JWT_SECRET);
      return res.status(200).send({ token: accessToken });
    });

  });

});

/* router.get('/register',  function(req, res, next) {
  return res.status(200).send("Registration page");
});

router.get('/login',  function(req, res, next) {
  return res.status(200).send("Login page");
}); */

router.post('/login', async function (req, res, next) {
  var body = req.body;

  if (!(body.mail && body.password))
    return res.status(400).send({ error: "Missing credentials." });
  Player.findOne({
    where: {
      mail: body.mail
    }
  }).then((exists) => {

    //no user found
    if (!exists)
      return res.status(400).send({ error: "Incorrect mail or password." });

      //else compare hash
    bcrypt.compare(body.password, exists.password, async function (err, match) {
      if (err || !match)
        return res.status(400).send({ error: "Invalid credentials." });
      const accessToken = jwt.sign({
        name: exists.name,
        id: exists.id
      }, process.env.JWT_SECRET);
      //Avoid sending sensitive data
      const playerInfo = _.pick(exists, ["name", "id", "mail"]);
      return res.status(200).send({
        message: "user logged in successfully.",
        token: accessToken,
        player: playerInfo,
      });
    });
  });
});

router.get('/', async function (req, res) {
  res.status(200).send("api up and running !");
});

router.get('/test', async function (req, res, next) {
  Channel.findOne({ include: [{ model: Message, attributes: ["createdAt", "id"], limit: 4 }] }).then(({messages}) => {
    let unordered = [...messages];
    res.json({ ordered: orderByDate(messages, false), unordered });
  });
  
});

module.exports = router;
