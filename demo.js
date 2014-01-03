'use strict';

var noisecomp = require('./');
var ndarray = require('ndarray');
var alea = require('alea');

var width = 1000;
var height = 1000;

var data = new Uint8Array(width * height);
var n = data.length;
var random = alea(42);
while (n-- > 0) {
  var x = n % width;
  var y = n / width;

  data[n] = Math.floor(random() * 2);
  if (y > 100) data[n] = 0;
}

noisecomp.showCanvas(data, width, height);
//window.showCanvas = showCanvas;

