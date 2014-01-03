'use strict';

var noisecomp = require('./');
var ndarray = require('ndarray');

var showCanvas = function(indexData, width, height, colors) {
  var canvas = document.createElement('canvas');
  canvas.setAttribute('style', 'border: 1px solid black; width: '+width+'px; height: '+height+'px;');
  var context = canvas.getContext('2d');
  var imageData = context.createImageData(width, height);
  var rgbaData = imageData.data;

  var i = indexData.length;
  while(i--) {
    var index = indexData[i];
    rgbaData[i * 4 + 0] = colors[index][0]; // TODO: use ndarray?
    rgbaData[i * 4 + 1] = colors[index][1];
    rgbaData[i * 4 + 2] = colors[index][2];
    rgbaData[i * 4 + 3] = colors[index][3];
  }

  context.putImageData(imageData, 0, 0);

  document.body.appendChild(canvas);
}

var width = 1000;
var height = 1000;

var data = new Uint8Array(width * height);
var n = data.length;
while (n-- > 0) {
  data[n] = Math.floor(Math.random() * 2);
}

var colors = [
  [255,255,255,255],   // 0 white
  [0,0,0,255]          // 1 black
];
showCanvas(data, width, height, colors);
