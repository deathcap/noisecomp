'use strict';

var noisecomp = require('./');

var gradient = noisecomp.generators.gradientY({minY:0, maxY:1000});
var noise = noisecomp.generators.noise({seed: 43});
var scale = noisecomp.transformers.scale(0,1, 0,0.75);
var step = noisecomp.transformers.step(0.5, 0, 1);
var simplex = noisecomp.generators.simplex({seed:42});

var f = function(x, y) {
  //return step(scale(source(x, y)));
  //return step(gradient(x, y) + noise(x, y));

  return gradient(x, y) + simplex(x/16, y/16);
};

noisecomp.test(f);

