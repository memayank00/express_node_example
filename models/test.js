'use strict';

const 
    mongoose        = require('mongoose'),
    path            = require('path'),
    Schema          = mongoose.Schema,

TestSchema 	= new Schema({

    name: {
        type: String,
    },
    email :{
        type: String,
    }
   
});

module.exports = mongoose.model('Test', TestSchema);