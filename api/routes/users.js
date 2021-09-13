var express = require('express');
var router = express.Router();
var db = require("../config/db.config");

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.send('registration page.');
});

router.get('/login', function(req, res, next) {
  res.send('login page.');
});

module.exports = router;
