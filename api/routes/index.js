var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.send('registration page.');
});

router.get('/login', function(req, res, next) {
  res.send('login page.');
});

module.exports = router;
