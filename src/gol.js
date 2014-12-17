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
  this.stringCoord = this.stringify();
};

gol.Point.prototype.stringify = function() {
  return this.x + ';' + this.y;
};

gol.CreateBeing = function(type, point) {
  this.type = type;
  this.point = point;
  this.status = 'living';
  this.envPoints = this.setEnvPoints();
};

gol.CreateBeing.prototype.setEnvPoints = function() {
  var envPoints = [];
  var matrix = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1]
  ];
  var envPoint;
  var self = this;
  matrix.forEach(function(offset) {
    envPoint = new gol.Point(self.point.x + offset[0], self.point.y + offset[1]);
    envPoints.push(envPoint);
  });
  return envPoints;
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
  var type;
  for (var i = 0; i < beingsMap.height; i++) {
    for (var j = 0; j < beingsMap.width; j++) {
      index = i*beingsMap.height + j;
      type = beingsMap.map[index];
      if (type !== '0') {
        point = new gol.Point(beingsMap.startX + j, beingsMap.startY + i);
        being = new gol.CreateBeing(type, point);
        gol.addBeing(being, world);
      }
    }
  }
};

gol.getBeing = function(point, world) {
  var strPoint = point.x + ';' + point.y;
  for (var i = 0; i < world.beings.length; i++) {
    if (world.beings[i].point.stringCoord === strPoint) {
      return world.beings[i];
    }
  }
  return null;
};

gol.getNeighsPointsByType = function(being, type, world) {
  var neighbour;
  var neighbours = being.envPoints.filter(function(point) {
    neighbour = gol.getBeing(point, world);
    if (neighbour !== null){
      return neighbour.type === type;
    }
    return false;
  });
  return neighbours;
};

gol.filterOutSamePoints = function(points) {
  var buff = [];
  return points.filter(function(point) {
    if (buff.indexOf(point.stringCoord) === -1) {
      buff.push(point.stringCoord);
      return true;
    }
    return false;
  });
};

gol.setEmptyNeighsPoints = function(world) {
  if (world.beings.length === 0) return [];
  var neighbours;
  var emptyNeighsPoints = [];
  world.beings.forEach(function(being) {
    being.envPoints.forEach(function(neighbourPoint) {
      if (gol.getBeing(neighbourPoint, world) === null) {
        emptyNeighsPoints.push(neighbourPoint);
      }
    });
  });
  world.emptyNeighsPoints = gol.filterOutSamePoints(emptyNeighsPoints);
};

gol.nextGen = function(world) {
  gol.world = world;
  gol.validateWorld();
  if (world.beings.length === 0) return gol.world;
};

module.exports = gol;

