var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('this is index javascript');

  res.render('index', { title: 'Express' });
});
router.get('/indexTest', function(req, res, next) {
	console.log('this is indexTest javascript');

  res.render('index', { title: 'Express indexTest' });
});
module.exports = router;
