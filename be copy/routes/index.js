var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `Management app API, db on ${process.env.DB_PORT}` });
});

module.exports = router;
