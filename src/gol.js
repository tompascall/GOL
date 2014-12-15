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

gol.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

gol.CreateBeing = function(type, point) {
  this.type = type;
  this.point = point;
  this.stringified = this.stringify();
};

gol.CreateBeing.prototype.stringify = function() {
  return this.point.x + ';' + this.point.y;
};

// gol.addBeing = function(type, point, world) {
//   var being = {};
//   being.type = type;
//   being.point = point;
//   world.beings.push(being);
//   return world;
// };

gol.nextGen = function(world) {
  gol.world = world;
  gol.validateWorld();
  if (world.beings.length === 0) return gol.world;
};

module.exports = gol;

