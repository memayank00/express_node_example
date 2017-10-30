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
	'/test/getSecondTestAuthentication'
]}));

//console.log(ctrl);
router.post('/firstCall', ctrl.testingCtrl.getFirstTest);
router.post('/secondCallAdd', ctrl.testing2Ctrl.getSecondTestAdd);
router.post('/secondCallFind', ctrl.testing2Ctrl.getSecondTestFind);
router.post('/secondCallUpdate', ctrl.testing2Ctrl.getSecondTestUpdate);
router.post('/getSecondTestAuthentication', ctrl.testing2Ctrl.getSecondTestAuthentication);

module.exports = router; 