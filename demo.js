'use strict';

var noisecomp = require('./');
var ndarray = require('ndarray');
var alea = require('alea');

var width = 1000;
var height = 1000;

var data = new Float32Array(width * height);

var random = alea(42);
noisecomp.fillXY(data, width, height, function(x, y) {
  var ret = random();
  if (y > 100) ret = 1.0;
  return ret;
});

noisecomp.showCanvas(data, width, height);
//window.showCanvas = showCanvas;

