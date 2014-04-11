'use strict';

var redis = require('redis');
var client = redis.createClient();

/**
 *  Save a message in the db
 */
exports.save = function(badges, callback) {
  if (!badges.length) return callback(null, null);
  var badge = badges.pop();

  client.lpush('badges', JSON.stringify(badge), function(err, data){
    if (err) return callback(err, null);
    exports.save(badges, callback);
  });
};

/**
 *  Trim down the redis list
 */
exports.trim = function() {
  client.ltrim('badges', 0, 9, function(err){
    if (err) throw err;
  });
};

/**
 *  Get badges
 */
exports.get = function(callback) {
  client.lrange('badges', 0, -1, callback);
};
