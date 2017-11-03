"use strict";
const path = require('path');
const config = {
    db: {
        URL: 'mongodb://100.100.7.165/node_example',
        //URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@100.100.7.165/zenbrisa?authSource=${process.env.AUTHENTICATION_DATABASE}`,
        // URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@100.100.7.38/zenbrisa?authSource=${process.env.AUTHENTICATION_DATABASE}`,
        DEBUG: true,
        autoIndex: true,
        log: true
    },
    server: {
        PORT: 3001,
        HOSTNAME: 'http://localhost:3001/'
    },
    secret: '876sdf&%&^435345(*^&^654sdsdc&^&kjsdfjbksdureyy3(&(*&(&7$%^#%#&^*(&)*)*',
    twilio : {
        /*accountSid:'AC08ae21996d3db94e96961e5f7653e9de',
        authToken:'c3e23538eb03cca4771549d2117eed74'  ,
        code : "+91",  
        number : "+12014823430",*/
        accountSid:'ACbe760882d3606c0b082a23ba7fe23391',
        authToken:'c9bd9a3b2a1c475984ea23a8804c8545'  ,
        code : "+91",  
        number : "+12014823430", //rohit_jaiswal@seologistics.com // Flexsin@123456789
  }
};
module.exports = config;