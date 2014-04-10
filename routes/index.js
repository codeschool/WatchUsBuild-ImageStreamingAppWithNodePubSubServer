'use strict';

var socket = require('../lib/pub');
var redis = require('../lib/redis');
var _ = require('underscore');

/**
 *  Save our message 
 */
exports.saveMessage = function(req, res, next) {
  var messages = _.clone(req.body);
  redis.save(messages, function(err, data){
    if (err) return res.send(503, err);
    next();
    redis.trim();
  });
};

/**
 *  Send our message
 */
exports.sendMessage = function(req, res, next) {
  var messages = req.body;
  messages.forEach(socket.send);
  res.send(200, 'success');
};
