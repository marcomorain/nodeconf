/* jslint node: true */
'use strict';
var _ = require('underscore');
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
  console.log('ready');

  // Create a standard `led` hardware instance
  var yellow = new five.Led({ pin: 13 });
  var red    = new five.Led({ pin: 12 });
  var ping   = new five.Ping(3);

  var wait = 2e3;

  ping.on('change', function(err, value) {
    console.log( ping.inches );
  });
  
});
