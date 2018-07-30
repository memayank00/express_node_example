'use strict';
const jwt 	 	= require('jsonwebtoken'),
	  twilio 	= require('twilio'),
	  twilioAPI = require('twilio-api'),
	  path 	 	= require('path'),
	  async 	= require('async'),
	  _ 		= require('lodash'),
	  mongoose 	= require('mongoose'),
	  moment 	= require('moment-timezone'),
	  stripe 	= require("stripe")("sk_test_B54oZQAv8W6TVt6nHTAcysjo"),
	  config 	= require(path.resolve(`./config/env/local`)),
	  url 		= require("url"),
	  ping 		= require ("net-ping"),
	  request 	= require('request'),
	  validUrl  = require('valid-url'),
	  needle  = require('needle'),
  	  Test      = require(path.resolve('./models/test'));
  
  /*this methos used for time zone*/
function toTimeZone(time, zone) {
    var format = 'YYYY/MM/DD HH:mm:ss ZZ';
    return moment(time, format).tz(zone).format(format);
}
exports.changeIntoTimezone = function(req,res,next){
	console.log('changeIntoTimezone----------')
	console.log('India-- '+toTimeZone(new Date(),'UTC'));
	console.log('Newyork-- '+toTimeZone(new Date(),'EST'));
	console.log('Chicago-- '+toTimeZone(new Date(),'CST'));
	console.log('Salt Lake City-- '+toTimeZone(new Date(),'MST'));
	console.log('Los Angeles-- '+toTimeZone(new Date(),'PST'));

};	  
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
    	console.log(message.sid,"sent to "+config.twilio.to)
    	res.json({status:200,message:`message send successfully to ${config.twilio.code}9971967452`});
      } 	
    )
    .catch((err) => console.log(err));	
};
exports.replySmsTwilio = function(req,res,next){
	console.log('replySmsTwilio---- ');	
	
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
	  Authorization :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lbWF5YW5rMDBAZ21haWwuY29tIiwibmFtZSI6Ik1heWFuayBTaW5naCIsImlhdCI6MTUwOTM0NjM1NH0.RRtS1TtD4E5_YIDupqkgmtfY_Go383DZ7MmaceNrZCc

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
				let token = jwt.sign(_obj, new Buffer(config.secret).toString('base64'),{ expiresIn: 60 * 60 });
				res.json({status:200,message:"success find",data:obj,token:token});
			}else{
			 	res.json({status:201,message:"user not found",data:obj});	
			}			
		}
	});
};
exports.checkValidUrl = function(req,res,next){
	//needle.get('158.85.76.204:8019', { compressed: true }, function(err, resp) {
	//needle.get('35.166.83.35', { compressed: true }, function(err, resp) {
	needle.get('https://www.zenbrisa.com', { compressed: true }, function(err, resp) {		
      if(err){
      	console.log('invalid------------');  
      }else{
      	console.log(resp.body); 
      	console.log('valid----------------');   
      }
                              
	});

	
	/*request('https://www.zenbrisa.com', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) 
	  }else{
	  	console.log('invalid---------'); 
	  }
	})*/

	/*var urll = "https://www.zenbrisa.co"
	if (validUrl.isUri(urll)){
	    console.log('Looks like an URI');
	} 
	else {
	    console.log('Not a URI');
	}*/

 	/*var session = ping.createSession ();
 	var target = 'https://www.zenbrisa.com/search-page';
	session.pingHost (target, function (error, target) {
	    if (error)
	        console.log (target + ": " + error.toString ());
	    else
	        console.log (target + ": Alive");
	});	*/

		
	/*var result = url.parse('https://www.zenbrisa.com/search-page');
	console.log(result.hostname);*/
/*	let myURL =
  new url('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
  console.log(myURL);*/
};
/*two way messaging*/
//https://support.twilio.com/hc/en-us/articles/235288367-Receiving-two-way-SMS-messages-with-Twilio
// https://www.twilio.com/console/sms/getting-started/build
//https://www.twilio.com/docs/api/twiml/sms/your_response
//https://www.twilio.com/docs/api/twiml/sms/twilio_request

//https://support.twilio.com/hc/en-us/articles/223136047--Configure-your-number-s-SMS-URL-message-on-new-Twilio-numbers

/*
Mongodb Backup
----------------
https://www.digitalocean.com/community/tutorials/how-to-back-up-restore-and-migrate-a-mongodb-database-on-ubuntu-14-04

*/
/*
prototype(run in chrome)
---------------------------
1-	function check(){
		this.name='mayank';
	}
	check.prototype.last = "singh";
	var check = new check();
	console.log('i am '+check.name+' '+check.last);
	console.log(check);

2-	function check(first){
		this.name=first;
	}
	check.prototype.last = 'Singh';
	check.prototype.foo = function(){
		console.log('this is proto function');
	};
	var check = new check('Mayank');

	console.log('check-- '+JSON.stringify(check));
	console.log(check.last);
	console.log(new check.foo());

change date formate like- 
---------------------------------------------
function changeDateFormate(created){
 //created should like 1491304729742.0 or any javascript formate
 var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  //var dateObj = new Date(1491304729742.0),
  var dateObj = new Date(created),
      month = monthNames[dateObj.getUTCMonth() + 1],
      day = dateObj.getUTCDate(),
      year = dateObj.getUTCFullYear(),
  //code for AM & PM Formate
      hours = dateObj.getHours(),
      minutes = dateObj.getMinutes(),
      ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm,
      formatedDate = day+'-'+month+'-'+year+' '+strTime ; 
   return formatedDate;
   //Tue Apr 04 2017 16:48:49 GMT+0530 (IST)
}	
changeDateFormate(created)


------------------------------------------------------------------------------------------------
Sh script for mongodb dump 
---------------------------- create a file name with mongodb_dump.sh
#!/bin/bash
MONGO_DATABASE="myDB"
APP_NAME="360emr"

MONGO_HOST="127.0.0.1"
MONGO_PORT="27017"
TIMESTAMP=`date +%F-%H%M`
MONGODUMP_PATH="/usr/bin/mongodump"
BACKUPS_DIR="/home/ubuntu/backups/$APP_NAME"
BACKUP_NAME="$APP_NAME-$TIMESTAMP"

# mongo admin --eval "printjson(db.fsyncLock())"
# $MONGODUMP_PATH -h $MONGO_HOST:$MONGO_PORT -d $MONGO_DATABASE  mongodump -d zenbrisa --gzip
$MONGODUMP_PATH  --gzip -d $MONGO_DATABASE
# mongo admin --eval "printjson(db.fsyncUnlock())"

mkdir -p $BACKUPS_DIR
mv dump $BACKUP_NAME
tar -zcvf $BACKUPS_DIR/$BACKUP_NAME.tgz $BACKUP_NAME
rm -rf $BACKUP_NAME
find $BACKUPS_DIR -mtime +30 -type f -delete

----------------- File End

this command to assign permisson for user to be executable---  sudo chmod +x mongo_backup.sh


this is cron for backup---   00 01 * * * /bin/sh /home/ubuntu/sh_scripts/mongo_backup.sh > /dev/null 2>&1

------------------------------------------------------------------------------------------------------------
*/