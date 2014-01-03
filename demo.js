'use strict';

var noisecomp = require('./');

var width = 3;
var height = 3;
var arrayBuffer = new ArrayBuffer(width * height * 4);
var data = new Uint8ClampedArray(arrayBuffer);
data.set([
    10,10,10,10, 10,10,10,10, 10,10,10,10,
    80,80,80,80, 10,10,10,10, 80,80,80,80,
    10,10,10,10, 10,10,10,10, 10,10,10,10
    ]);
var imageData = new ImageData(data, width, height);

var canvas = document.createElement('canvas');
canvas.setAttribute('style', 'border: 1px solid black;');
var context = canvas.getContext('2d');
//var imageData = context.createImageData(3, 3);
context.putImageData(imageData, 0, 0);

document.body.appendChild(canvas);
