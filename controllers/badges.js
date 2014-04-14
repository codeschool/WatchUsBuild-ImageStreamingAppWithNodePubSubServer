'use strict';

var socket = require('../lib/socket');
var badges = require('../models/badges');
var _ = require('underscore');

/**
 *  Save our badges
 */
exports.save = function(req, res, next) {
  var badgeList = _.clone(req.body);
  badges.save(badgeList, function(err, data){
    if (err) return res.send(503, err);
    next();
  });
};

/**
 *  Trim the badges
 */
exports.trim = function(req, res, next) {
  badges.trim();
  next();
};

/**
 *  Send our badges
 */
exports.send = function(req, res, next) {
  var badgeList = _.clone(req.body);
  badgeList.forEach(socket.send);
  res.send(200, 'success');
};

/**
 *  Get our badges
 */
exports.get = function(req, res, next) {
  badges.get(function(err, data){
    if (err) return res.send(503, 'Trouble loading badges');
    res.json(200, data.map(JSON.parse));
  });
};
