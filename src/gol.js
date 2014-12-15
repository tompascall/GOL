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

gol.validateWorldTypeOfBeing = function() {
  if (!Array.isArray(gol.world.beings)) {
    throw new Error('Error: "beings" property must be an array');
  }
};

gol.validateWorld = function() {
  gol.validateWorldMissing();
  gol.validateWorldIsObject();
  gol.validateWorldHasKey('beings');
  gol.validateWorldTypeOfBeing();
};

gol.nextGen = function(world) {
  gol.world = world;
  gol.validateWorld();
  if (world.beings.length === 0) return gol.world;
};

module.exports = gol;

