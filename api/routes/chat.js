var express = require('express');
const {verifyToken} = require("../middleware/auth");
const {Message} = require("../config/models/Message");
var router = express.Router();
const STATIC_CHANNELS = ['main', 'help'];
const { Channel } = require("../config/models/Channel")

router.get('/getChannels', async function(req, res, ) {
    res.json({
        channels: await Channel.findAll()
    })
});

module.exports = router;