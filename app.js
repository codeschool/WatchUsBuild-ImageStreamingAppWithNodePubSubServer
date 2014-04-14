'use strict';

var express = require('express');
var badges = require('./controllers/badges');

var app = express();
var port = process.env.PORT || 8000;

/**
 *  Have our server listen on port 8000
 */
app.listen(port, function(){
  console.log('Server running on port %d', port);
});

/**
 *  Parse json data from incoming reuqests
 */
app.use(express.json());

/**
 *  Accept POST requests and then publish the body of the request
 */
app.post('/', badges.save, badges.trim, badges.send);

/**
 *  Get the most recent 10 badges
 */
app.get('/badges', badges.get);
