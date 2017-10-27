'use strict';
const 
	path 	 	= require('path'),
	async 	 	= require('async'),
	_ 			= require('lodash'),
	mongoose 	= require('mongoose');
  	//config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`));

exports.getFirstTest= function(req, res){
	res.json({message:'Hellobuddy! this is first'});
	
};
  	