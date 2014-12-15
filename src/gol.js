// gol.js

'use strict';

var gol = {};

gol.validateWorldMissing = function() {
  if (gol.world === undefined) {
    throw new Error('Error: "world" argument is missing');
  }
};

gol.validateWorldIsObject = function() {
  if (!(gol.world instanceof Object)) {
    throw new Error('Error: world argument must be an object');
  }
};

gol.validateWorldHasKey = function(key) {
  var keys = Object.keys(gol.world);
  if (keys.indexOf(key) === -1) {
    throw new Error('Error: "world" object has no "' + key + '" property');
  }
};

gol.validateWorldTypeOfKey = function(key, type) {
  if (typeof gol.world[key] !== type) {
    throw new Error('Error: "' + key + '" property must be a(n) '+ type);
  }
};

gol.validateWorld = function() {
  gol.validateWorldMissing();
  gol.validateWorldIsObject();
  gol.validateWorldHasKey('beings');
  gol.validateWorldTypeOfKey('beings', 'array');
};

gol.nextGen = function(world) {
  gol.world = world;
  gol.validateWorld();
  return gol.world;
};

module.exports = gol;

