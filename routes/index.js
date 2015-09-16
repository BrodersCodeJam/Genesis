var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Visual Studio Code!' });
});

/* GET Quick Start. */
router.get('/quickstart', function(req, res, next) {
  res.render('quickstart');
  
 
  
});

/* Statement (Income and Expense) */
router.get('/accountSummary', function(req, res, next) {
  res.render('accountSummary');
});

module.exports = router;
