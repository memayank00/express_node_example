'use strict';
const jwt 	 	= require('jsonwebtoken'),
	  twilio 	= require('twilio'),
	  path 	 	= require('path'),
	  async 	= require('async'),
	  _ 		= require('lodash'),
	  mongoose 	= require('mongoose'),
	  stripe 	= require("stripe")("sk_test_B54oZQAv8W6TVt6nHTAcysjo"),
	  config 	= require(path.resolve(`./config/env/local`)),
  	  Test      = require(path.resolve('./models/test'));
/*this is test to merge*/
exports.stripe = function(req,res,next){
	/*request----
	  http://localhost:3001/test/stripe   (call this from browser)
	*/
	console.log('stripe---');
	res.render('stripe', { title: 'stripe payment' });
};
exports.your_server_side_code = function(req,res,next){
	/*this method only for redirect for payment successfull by previous method.

		request
		----------
		{ stripeToken: 'tok_1BIwAuF0Mpi16mtBnm4eBeiQ',
		  stripeTokenType: 'card',
		  stripeEmail: 'mayank_singh@seologistics.com' }
	*/
	console.log(req.body);
	let token = req.body.stripeToken;
	// Charge the user's card:
	stripe.charges.create({
	  amount: 1000,
	  currency: "usd",
	  description: "Example charge",
	  source: token,
	}, function(err, charge) {
	  if(err){
	  	console.log('Error--- '+JSON.stringify(err));
	  }else{
	  	console.log("-------charge----------");
	  	console.log(charge);
	  	res.render('stripe_success', { title: 'stripe payment successfully' });

	  }
	});
};
exports.sendSmsTwilio = function(req,res,next){
	/*request----
	  localhost:3001/test/sendSmsTwilio
	*/
var client = new twilio(config.twilio.accountSid, config.twilio.authToken);
console.log(`${config.twilio.code}9971967452`);

client.messages.create({
        body: 'Hello Mayank! you twillio testing Success.',
        to: `${config.twilio.code}9971967452`,  // Text this number and this number have to verify from account
        from: config.twilio.number // From a valid Twilio number
    })
    .then((message) =>{
    	//console.log(message.sid,"sent to "+config.twilio.to)
    	res.json({status:200,message:`message send successfully to ${config.twilio.code}9971967452`});
      } 	
    )
    .catch((err) => console.log(err));	
};
exports.getSecondTestAdd = function(req,res,next){
	
	/*request----
	  localhost:3001/test/secondCallAdd
	  {"name":"mayank","email":"memayank00@gmail.com"}
	*/
	let test =  new Test(req.body);
	test.save((err,savedObj)=>{
		if(err){
			console.log(err)
		}else{
			console.log(savedObj)
			res.json({status:200,message:"success Add",data:savedObj});
		}
	});
};
exports.getSecondTestFind = function(req,res,next){
	
	/*request----
	  localhost:3001/test/secondCallFind
	  {"email":"memayank00@gmail.com"}
	*/
	console.log(req.body);
	Test.find(req.body,(err,obj)=>{
		if(err){
			console.log(err);
		}else{
			res.json({status:200,message:"success find",data:obj});
		}
	});
};

exports.getSecondTestUpdate = function(req,res,next){
	
	/*request----
	  localhost:3001/test/secondCallUpdate
	  {"name":"Mayank Singh","email":"memayank00@gmail.com"}
	*/
	Test.update({email:req.body.email},{name:req.body.name},(err,result)=>{
		if(err){
			console.log(err);
		}else{
			res.json({status:200,message:"success Update",data:result});
		}
	});
};
exports.getSecondTestAuthentication = function(req,res,next){
	
	/*request----
	  localhost:3001/test/getSecondTestAuthentication
	  {"email":"memayank00@gmail.com"}
	*/
	Test.findOne(req.body,(err,obj)=>{
		//console.log(obj);
		if(err){
			console.log(err);
		}else{
			if(obj){
				let _obj = {email:obj.email,name:obj.name};
				let token = jwt.sign(_obj, new Buffer(config.secret).toString('base64'));
				res.json({status:200,message:"success find",data:obj,token:token});
			}else{
			 res.json({status:201,message:"user not found",data:obj});	
			}
			
		}
	});
};