var express = require('express');
const {verifyToken} = require("../middleware/auth");
const {Message} = require("../config/models/Message");
var router = express.Router();
const { Channel } = require("../config/models/Channel");
const { Player } = require('../config/models/Player');
const constants = require('../bin/constants');
const {orderByDate} = require('./routeUtils')

router.get('/getChannels', async function(req, res, ) {
    console.log("/getChannels");
    let channels = await Channel.findAll({include: [{model: Message, include: [{model: Player, attributes: ["name", "id"]}]}]});
    channels = channels.map(channel => {
        channel.messages = orderByDate(channel.messages, false).slice(0, constants.chatMessageLimit);
        return channel;
    });
    res.json({
       channels
    })
});

router.post('/getChannelMessages', async function (req, res) {
    console.log("/getChannelMessages");
    let channelId = req.body.channelId;
    let channel = await Channel.findOne({where: {id: channelId}, include: [{model: Message, include: [{model: Player, attributes: ["name", "id"]}]}]});
    res.json({
        participants: channel.participants,
        messages: orderByDate(channel.messages, false).slice(0, constants.chatMessageLimit)
    });
});

module.exports = router;