'use strict';

var redis = require('../lib/redis');

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
 *  Get badges
 */
exports.get = function(callback) {
  redis.lrange('badges', 0, -1, callback);
};
