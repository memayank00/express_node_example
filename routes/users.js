var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log('this is user javascript');
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
	console.log('this is user test javascript');
  res.send('respond with a test resource');
});
router.get('/testAgain', function(req, res, next) {
	console.log('this is user test javascript');
  res.send('respond with a test Again resource');
});
module.exports = router;
