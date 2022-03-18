var express = require('express');
const {verifyToken} = require("../middleware/auth");
const {Message} = require("../config/models/Message");
var router = express.Router();
const STATIC_CHANNELS = ['main', 'help'];
const { Channel } = require("../config/models/Channel")

router.get('/getChannels', async function(req, res, ) {
    res.json({
        channels: await Channel.findAll({include: [Message]})
    })
});

router.get('/getChannelMessages', async function (req, res) {
    let channelId = req.body.channelId;
    let channel = await Channel.findOne({where: {id: channelId}, include: [Message]});
    res.json({
        messages: channel.messages
    });
});

module.exports = router;