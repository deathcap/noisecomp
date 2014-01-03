'use strict';

var Alea = require('alea');
var SimplexNoise = require('simplex-noise');

var indexedToRGBA = function(index, colors) {
  if (colors === undefined) 
    colors = [
    [255,255,255,255],   // 0 white
    [0,0,0,255]          // 1 black
  ];

  return colors[index];
};

var floatToRGBA = function(f) {
  // grayscale, 1.0 = black, 0.0 = white
  var n = 255 - Math.ceil(f * 255);

  return [n, n, n, 255];
};

module.exports = {
  showCanvas: function(sourceData, width, height, scale, convert) {
    var canvases = document.getElementsByTagName('canvas');
    var canvas = (canvases.length > 0) ? canvases[0] : document.createElement('canvas');

    if (convert === undefined) {
      if (sourceData instanceof Uint8Array)
        convert = indexedToRGBA;
      else if (sourceData instanceof Float32Array)
        convert = floatToRGBA;
    }

    scale = scale || 1;

    canvas.setAttribute('style', 'border: 1px solid black; width: '+(width * scale)+'px; height: '+(height * scale)+'px;'+
// http://stackoverflow.com/questions/7615009/disable-interpolation-when-scaling-a-canvas
'    image-rendering: optimizeSpeed;' +             // Older versions of FF
'    image-rendering: -moz-crisp-edges;' +          // FF 6.0+
'    image-rendering: -webkit-optimize-contrast;' + // Webkit (Safari now, Chrome soon)
'    image-rendering: -o-crisp-edges;' +            // OS X & Windows Opera (12.02+)
//'    image-rendering: optimize-contrast;' +         // Possible future browsers.
'    -ms-interpolation-mode: nearest-neighbor;');   // IE

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(width, height);
    var rgbaData = imageData.data;

    var i = sourceData.length;
    while(i--) {
      var rgba = convert(sourceData[i]);

      rgbaData[i * 4 + 0] = rgba[0];
      rgbaData[i * 4 + 1] = rgba[1];
      rgbaData[i * 4 + 2] = rgba[2];
      rgbaData[i * 4 + 3] = rgba[3];
    }

    context.putImageData(imageData, 0, 0);

    document.body.appendChild(canvas);
  },

  fillXY: function(data, width, height, cb) {
    var n = data.length;
    while (n-- > 0) {
      var x = n % width;
      var y = Math.floor(n / width);

      data[n] = cb(x, y);
    }
  },


  test: function(f) {
    var width = 1000;
    var height = 1000;
    var scale = 1;

    var data = new Float32Array(width * height);

    module.exports.fillXY(data, width, height, f);
    module.exports.showCanvas(data, width, height, scale);
  },

  // implicit 2-dimensional functions
  generators: {
    checkerboard: function(opts) {
      return function(x, y) {
        return (x + y) & 1;
      };
    },

    noise: function(opts) {
      var seed = opts.seed;
      var random = opts.random || Alea(seed);
      return function(x, y) {
        return random(x, y);
      };
    },

    gradientY: function(opts) {
      var minY = opts.minY || 0;
      var maxY = opts.maxY || 1;
      return function(x, y) {
        return y / (maxY - minY);
      };
    },

    simplex: function(opts) {
      var seed = opts.seed || 0;
      var simplex = new SimplexNoise(new Alea(seed));

      return function(x, y) {
        return simplex.noise2D(x, y); // TODO: bind?
      };
    },

    octaves: function(opts) {
      //var count = opts.count || 6; // TODO
      var source = opts.source;

      return function(x, y) {
        return source(x/8, y/8) + source(x/16, y/16) + source(x/32, y/32) + source(x/64, y/64);
      };
    },
  },


  transformers: {
    scale: function(fromLow, fromHigh, toLow, toHigh) {
      return function(x) {
        return (x - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
      }
    },

    step: function(threshold, below, above) {
      return function(x) {
        return (x < threshold) ? below : above;
      }
    },
  },
};

window.noisecomp = module.exports; // for debugging

