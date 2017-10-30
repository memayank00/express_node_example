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
    secret: '876sdf&%&^435345(*^&^654sdsdc&^&kjsdfjbksdureyy3(&(*&(&7$%^#%#&^*(&)*)*'
};
module.exports = config;