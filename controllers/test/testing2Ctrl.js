'use strict';
const jwt 	 	= require('jsonwebtoken'),
	  path 	 	= require('path'),
	  async 	= require('async'),
	  _ 		= require('lodash'),
	  mongoose 	= require('mongoose'),
	  config 	= require(path.resolve(`./config/env/local`)),
  	  Test      = require(path.resolve('./models/test'));


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