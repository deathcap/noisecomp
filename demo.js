'use strict';

var noisecomp = require('./');
var ndarray = require('ndarray');
var alea = require('alea');

var width = 1000;
var height = 1000;

var data = new Uint8Array(width * height);

var random = alea(42);
noisecomp.fillXY(data, width, height, function(x, y) {
  var ret = Math.floor(random() * 2);
  if (y > 100) ret  = 0;
  return ret;
});

noisecomp.showCanvas(data, width, height);
//window.showCanvas = showCanvas;

