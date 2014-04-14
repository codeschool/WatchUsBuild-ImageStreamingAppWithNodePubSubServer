'use strict';

var socket = require('../lib/pub');
var badges = require('../models/badges');
var _ = require('underscore');

/**
 *  Save our badges
 */
exports.saveBadges = function(req, res, next) {
  var badgeList = _.clone(req.body);
  badges.save(badgeList, function(err, data){
    if (err) return res.send(503, err);
    next();
    badges.trim();
  });
};

/**
 *  Send our badges
 */
exports.sendBadges = function(req, res, next) {
  var badgeList = _.clone(req.body);
  badgeList.forEach(socket.send);
  res.send(200, 'success');
};

/**
 *  Get our badges
 */
exports.getBadges = function(req, res, next) {
  badges.get(function(err, data){
    if (err) return res.send(503, 'Trouble loading badges');
    res.json(200, data.map(JSON.parse));
  });
};
