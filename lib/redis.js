'use strict';

var config = require('../config.json').redis;
var redis = require('redis');
var client = redis.createClient(config.port, config.host);

if (config.auth) client.auth(config.auth);

client.on('error', function(err){
  throw err;
});

module.exports = client;
