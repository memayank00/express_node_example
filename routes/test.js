const express = require('express'),
	fs = require('fs'),
	path = require('path'),
	expressJWT 	= require('express-jwt'),
	config 	= require(path.resolve(`./config/env/local`)),
 	router = express.Router();
 

/* GET test listing. */

/*fs.readdir(path.resolve('./controllers/test')).forEach(file=>{
	console.log(file);	
})*/
let ctrl = {};
fs.readdirSync(path.resolve('./controllers/test')).forEach(file => {
	console.log(file)
	let name = file.substr(0,file.indexOf('.'));
	ctrl[name] = require(path.resolve(`./controllers/test/${name}`));
	//ctrl[name] = require(`../controllers/test/${name}`);  
});
//check for user authentication

router.use(expressJWT({ 
	secret: new Buffer(config.secret).toString('base64')
}).unless({path: [
	'/test/getSecondTestAuthentication',
	'/test/stripe',
	'/test/your-server-side-code'
]}));

//console.log(ctrl);
router.post('/firstCall', ctrl.testingCtrl.getFirstTest);
router.post('/secondCallAdd', ctrl.testing2Ctrl.getSecondTestAdd);
router.post('/secondCallFind', ctrl.testing2Ctrl.getSecondTestFind);
router.post('/secondCallUpdate', ctrl.testing2Ctrl.getSecondTestUpdate);
router.post('/getSecondTestAuthentication', ctrl.testing2Ctrl.getSecondTestAuthentication);
router.post('/sendSmsTwilio', ctrl.testing2Ctrl.sendSmsTwilio);
router.get('/stripe', ctrl.testing2Ctrl.stripe);
router.post('/your-server-side-code', ctrl.testing2Ctrl.your_server_side_code);
/*router.get('/stripe', function(req, res, next) {
	console.log('this is stripe');

  res.render('stripe', { title: 'stripe payment' });
});*/
module.exports = router; 