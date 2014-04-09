'use strict';

var express = require('express');
var axon = require('axon');

var app = express();
var socket = axon.socket('pub');

socket.bind(8001);
app.listen(8000);

/**
 *  Parse json data from incoming reuqests
 */
app.use(express.json());

app.post('/', function(req, res){
  var badge = req.body;
  socket.send('badge', badge);
  res.send(200, 'success');
});
