'use strict';

var axon = require('axon');
var socket = axon.socket('pub');

/**
 *	Bind our publisher onto port 8001
 */
socket.bind(8001);

/**
 *	Throw errors if need be
 */
socket.on('error', function(err){
	throw err;
});

/**
 *	publish the badge to the pub/sub system
 */
exports.send = function(data){
	socket.send('badge', data);
};
