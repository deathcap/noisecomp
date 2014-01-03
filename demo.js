'use strict';

var noisecomp = require('./');
var ndarray = require('ndarray');
var alea = require('alea');

var random = alea(42);

noisecomp.test(noisecomp.checkerboard());

