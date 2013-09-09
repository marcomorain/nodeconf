/* jslint node: true */
'use strict';
var _ = require('underscore');
var five = require('johnny-five');
var board = new five.Board();


board.on('ready', function() {
  console.log('ready');

  // Create a standard `led` hardware instance
  var yellow = new five.Led({ pin: 3 });
  var red    = new five.Led({ pin: 5 });
  var ping   = new five.Ping(13);

  var Output = function(ping, led, far, near) {
    this.ping = ping;
    this.led = led;
    this.near = near;
    this.far = far;
    this.distance = ping.cm;
  };

  Output.prototype.update = function() {
    this.distance = this.ping.cm;
    if (this.distance > this.far) {
      this.led.off();
    } else if (this.distance < this.far && this.distance > this.near) {

      var fraction = this.distance - this.near;
      var brightness = fraction / (this.far - this.near);
      this.led.brightness(255 * (1-brightness));
      this.led.on();
    } else {
      this.led.brightness(255);
      this.led.on();
    }
  };

  var outputs = [ new Output(ping, yellow, 50, 25),
                  new Output(ping, red,    25, 0)];

  ping.on('change', function(err, value) {
    _.each(outputs, function (output) {
      output.update();
    })
  });
  
});
