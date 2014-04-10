'use strict';

var redis = require('redis');
var client = redis.createClient();

/**
 *  Save a message in the db
 */
exports.save = function(badges, callback) {
  if (!badges.length) return callback(null, null);
  var badge = badges.pop();

  client.lpush('badges', badge, function(err, data){
    if (err) return cb(err, null);
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
