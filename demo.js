'use strict';

var noisecomp = require('./');

var source = noisecomp.generators.noise({seed: 43});
var t1 = noisecomp.transformers.scale(0,1, 0,0.75);
var t2 = noisecomp.transformers.step(0.5, 0, 1);

var f = function(x, y) {
  return t2(t1(source(x, y)));
};

noisecomp.test(f);

