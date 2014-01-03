'use strict';

var alea = require('alea');

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
  showCanvas: function(sourceData, width, height, convert) {
    var canvases = document.getElementsByTagName('canvas');
    var canvas = (canvases.length > 0) ? canvases[0] : document.createElement('canvas');

    if (convert === undefined) {
      if (sourceData instanceof Uint8Array)
        convert = indexedToRGBA;
      else if (sourceData instanceof Float32Array)
        convert = floatToRGBA;
    }

    canvas.setAttribute('style', 'border: 1px solid black; width: '+width+'px; height: '+height+'px;');
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
      var y = n / width;

      data[n] = cb(x, y);
    }
  },


  test: function(f) {
    var width = 1000;
    var height = 1000;

    var data = new Float32Array(width * height);

    module.exports.fillXY(data, width, height, f);
    module.exports.showCanvas(data, width, height);
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
      var random = opts.random || alea(seed);
      return function(x, y) {
        return random(x, y);
      };
    },

    gradient: function(opts) {
      var minX = opts.minX || 0;
      var maxX = opts.maxX || 1000;
      var minY = opts.minY || 0;
      var maxY = opts.maxY || 1000;
      return function(x, y) {
        return x / (maxX - minX) + y / (maxY - minY);
      };
    }
  },


  transformers: {
    scale: function(fromLow, fromHigh, toLow, toHigh) {
      return function(x) {
        return (x - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
      }
    },

    step: function(threshold, above, below) {
      return function(x) {
        return (x >= threshold) ? above : below;
      }
    },
  },
};


window.noisecomp = module.exports; // for debugging
