'use strict';

var socket = require('../lib/pub');
var redis = require('../lib/redis');
var _ = require('underscore');

/**
 *  Save our badges
 */
exports.saveBadges = function(req, res, next) {
  var badges = _.clone(req.body);
  redis.save(badges, function(err, data){
    if (err) return res.send(503, err);
    next();
    redis.trim();
  });
};

/**
 *  Send our badges
 */
exports.sendBadges = function(req, res, next) {
  var badges = req.body;
  badges.forEach(socket.send);
  res.send(200, 'success');
};

/**
 *  Get our badges
 */
exports.getBadges = function(req, res, next) {
  redis.get(function(err, data){
    if (err) return res.send(503, 'Trouble loading badges');
    res.json(200, data.map(JSON.parse));
  });
};
