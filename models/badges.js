'use strict';

var redis = require('../lib/redis');
var socket = require('../lib/socket');

/**
 *  Save a message in the db
 */
exports.save = function(badges, callback) {
  if (!badges.length) return callback(null, null);
  var badge = badges.pop();

  redis.lpush('badges', JSON.stringify(badge), function(err, data){
    if (err) return callback(err, null);
    exports.save(badges, callback);
  });
};

/**
 *  Trim down the redis list
 */
exports.trim = function() {
  redis.ltrim('badges', 0, 9, function(err){
    if (err) throw err;
  });
};

/**
 *  Send badges to the socket
 */
exports.send = function(badges) {
  badges.forEach(socket.send);
};

/**
 *  Get badges
 */
exports.get = function(callback) {
  redis.lrange('badges', 0, -1, function(err, data){
    if (err) return callback(err, null);
    callback(null, data.map(JSON.parse));
  });
};
