'use strict';

var noisecomp = require('./');

var width = 3;
var height = 3;

var canvas = document.createElement('canvas');
canvas.setAttribute('style', 'border: 1px solid black; width: 100px; height: 100px;');
var context = canvas.getContext('2d');
var imageData = context.createImageData(width, height);
console.log(imageData);
imageData.data.set([
    100,100,100,255, 100,100,100,255, 100,100,100,255,
    255,255,255,255, 100,100,100,255, 255,255,255,255,
    100,100,100,255, 100,100,100,255, 100,100,100,255
    ]);
console.log(imageData.data);
console.log(imageData.width);
console.log(imageData.height);
context.putImageData(imageData, 0, 0);

document.body.appendChild(canvas);
