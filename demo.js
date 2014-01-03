'use strict';

var noisecomp = require('./');

var gradient = noisecomp.generators.gradient({});
var source = noisecomp.generators.noise({seed: 43});
var scale = noisecomp.transformers.scale(0,1, 0,0.75);
var step = noisecomp.transformers.step(0.5, 0, 1);

var f = function(x, y) {
  //return step(scale(source(x, y)));
  return gradient(x, y);
};

noisecomp.test(f);

