'use strict';

var axon = require('axon');
var socket = axon.socket('pub');

/**
 *  Bind the pub socket to localhost:8001
 */
socket.bind(8001);

/**
 *  On error
 */
socket.on('error', function(err){
  throw err;
});

/**
 *  publish the badge to the pub/sub system
 */
exports.send = function(data){
  socket.send(data);
};
