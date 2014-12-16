// gol.js

'use strict';

var gol = {};

gol.validateWorldMissing = function() {
  if (gol.world === undefined) {
    throw new Error('Error: "world" argument is missing');
  }
};

gol.validateParamIsObject = function(param, name) {
  if (!(param instanceof Object)) {
    throw new Error('Error: ' + name + ' argument must be an object');
  }
};

gol.validateKey = function(obj, objName, key) {
  var keys = Object.keys(obj);
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
  gol.validateParamIsObject(gol.world, 'world');
  gol.validateKey(gol.world, 'world', 'beings');
  gol.validateWorldTypeOfBeing();
};

gol.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

gol.CreateBeing = function(type, point) {
  this.type = type;
  this.point = point;
  this.stringCoord = this.stringify();
  this.status = 'living';
};

gol.CreateBeing.prototype.stringify = function() {
  return this.point.x + ';' + this.point.y;
};

gol.addBeing = function(being, world) {
  world.beings.push(being);
  return world;
};

gol.validateBeingsMapValues = function(beingsMap) {
  if (!Array.isArray(beingsMap.map)) {
    throw new Error('map of beingsMap must be an array');
  }
  if (beingsMap.map.length !== beingsMap.width * beingsMap.height) {
    throw new Error('Error: inappropriate value of being map dimensions or number of map elements');
  }
};

gol.validateBeingsMapKeys = function(beingsMap) {
  gol.validateKey(beingsMap, 'beingsMap', 'map');
  gol.validateKey(beingsMap, 'beingsMap', 'width');
  gol.validateKey(beingsMap, 'beingsMap', 'height');
  gol.validateKey(beingsMap, 'beingsMap', 'startX');
  gol.validateKey(beingsMap, 'beingsMap', 'startY');
};

gol.validateBeingsMap = function(beingsMap) {
  gol.validateParamIsObject(beingsMap, 'beingsMap');
  gol.validateBeingsMapKeys(beingsMap);
  gol.validateBeingsMapValues(beingsMap);
};

gol.loadBeingsMap = function(beingsMap, world) {
  gol.validateBeingsMap(beingsMap);
  var point;
  var index;
  var being;
  for (var i = 0; i < beingsMap.height; i++) {
    for (var j = 0; j < beingsMap.width; j++) {
      index = i*beingsMap.height + j;
      if (beingsMap.map[index] === 'simp') {
        point = new gol.Point(beingsMap.startX + j, beingsMap.startY + i);
        being = new gol.CreateBeing('simp', point);
        gol.addBeing(being, world);
      }
    }
  }
};

gol.nextGen = function(world) {
  gol.world = world;
  gol.validateWorld();
  if (world.beings.length === 0) return gol.world;
};

module.exports = gol;

