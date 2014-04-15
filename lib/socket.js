'use strict';

var redis = require('./redis');

/**
 *  publish the badge to the pub/sub system
 */
exports.send = function(data){
  redis.publish('badge', JSON.stringify(data));
};
