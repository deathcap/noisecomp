'use strict';

var noisecomp = require('./');

var width = 3;
var height = 3;

var canvas = document.createElement('canvas');
canvas.setAttribute('style', 'border: 1px solid black; width: 100px; height: 100px;');
var context = canvas.getContext('2d');
var imageData = context.getImageData(0, 0, width, height);
console.log(imageData);
imageData.data.set([
    100,100,100,100, 100,100,100,100, 100,100,100,100,
    255,255,255,255, 100,100,100,100, 255,255,255,255,
    100,100,100,100, 100,100,100,100, 100,100,100,100
    ]);
console.log(imageData);
context.putImageData(imageData, 0, 0);

document.body.appendChild(canvas);
