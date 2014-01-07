'use strict';

var noisecomp = require('./');

var gradient = noisecomp.generators.gradientY({minY:0, maxY:1000});
var noise = noisecomp.generators.noise({seed: 43});
var scale = noisecomp.transformers.scale(0,1, 0,0.75);
var step = noisecomp.transformers.step(0.5, 0, 1);
var simplex = noisecomp.generators.simplex({seed:42});

var octaves = noisecomp.generators.octaves({source: simplex})

var f = function(x, y) {
  //return step(scale(source(x, y)));
  //return step(gradient(x, y) + noise(x, y));
  //return gradient(x, y) + simplex(x/16, y/16) + simplex(x/32, y/32) + simplex(x/64, y/64) + simplex(x/8, y/8);
  //return octaves(x, y);
  //return step(gradient(x, y + octaves(x, y) * 10));

  x /= 1000;
  var gl_FragColor;

  var tileCount = 5;
  var uStart = 0.0;
  var uEnd = 0.5;

  var tile = function(x, times) {
    return x % (1 / times) * times;
  };

  var scale = function(x, fromLow, fromHigh, toLow, toHigh) {
    return (x - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
  };

  gl_FragColor = scale(tile(x, tileCount), 0, 1, uStart, uEnd);

  //gl_FragColor = x % mod * tileCount;

  return gl_FragColor;
};

noisecomp.test(f);

