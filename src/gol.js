// gol.js

'use strict';

var gol = {};

gol.Point = function(x, y) {
  this.x = x;
  this.y = y;
  this.stringCoord = this.stringify();
};

gol.Point.prototype.stringify = function() {
  return this.x + ';' + this.y;
};

gol.CreateBeing = function(point, status) {
  this.point = point;
  this.status = status;
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

gol.World = function(){
  this.beings = [];
  this.emptyNeighbours = [];
};

gol.World.prototype.addBeing = function(being) {
  this.beings.push(being);
};

gol.validateKey = function(obj, objName, key) {
  var keys = Object.keys(obj);
  if (keys.indexOf(key) === -1) {
    throw new Error('Error: "world" object has no "' + key + '" property');
  }
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
};

gol.validateParamIsObject = function(param, name) {
  if (!(param instanceof Object)) {
    throw new Error('Error: ' + name + ' argument must be an object');
  }
};

gol.validateBeingsMap = function(beingsMap) {
  gol.validateParamIsObject(beingsMap, 'beingsMap');
  gol.validateBeingsMapKeys(beingsMap);
  gol.validateBeingsMapValues(beingsMap);
};

gol.World.prototype.loadBeingsMap = function(beingsMap) {
  gol.validateBeingsMap(beingsMap);
  var point;
  var index;
  var being;
  var type;
  for (var i = 0; i < beingsMap.height; i++) {
    for (var j = 0; j < beingsMap.width; j++) {
      index = i*beingsMap.width + j;
      type = beingsMap.map[index];
      if (type !== 0 && type !== '0') {
        point = new gol.Point(j, i);
        being = new gol.CreateBeing(point, 'alive');
        this.addBeing(being);
      }
    }
  }
};

gol.World.prototype.getBeing = function(point) {
  var strPoint = point.x + ';' + point.y;
  for (var i = 0; i < this.beings.length; i++) {
    if (this.beings[i].point.stringCoord === strPoint) {
      return this.beings[i];
    }
  }
  return null;
};

gol.World.prototype.countLiveNeighbours = function(being) {
  var neighbour;
  var self = this;
  var neighbours = being.envPoints.filter(function(point) {
    neighbour = self.getBeing(point);
    if (neighbour !== null){
      return neighbour.status === 'alive';
    }
    return false;
  });
  return neighbours.length;
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

gol.World.prototype.setEmptyNeighsPoints = function() {
  if (this.beings.length === 0) return [];
  var emptyNeighsPoints = [];
  var self = this;
  this.beings.forEach(function(being) {
    being.envPoints.forEach(function(neighbourPoint) {
      if (self.getBeing(neighbourPoint) === null) {
        emptyNeighsPoints.push(neighbourPoint);
      }
    });
  });
  this.emptyNeighsPoints = gol.filterOutSamePoints(emptyNeighsPoints);
};

gol.World.prototype.addEmptyNeighbour = function(emptyNeighbour) {
  this.emptyNeighbours.push(emptyNeighbour);
};

gol.World.prototype.setEmptyNeighbours = function() {
  var emptyNeighbour;
  this.setEmptyNeighsPoints();
  var self = this;
  this.emptyNeighsPoints.forEach(function(point) {
    emptyNeighbour = new gol.CreateBeing(point, 'potential');
    self.addEmptyNeighbour(emptyNeighbour);
  });
};

gol.World.prototype.willAlive = function(being) {
  var liveNeighbours;
  liveNeighbours = this.countLiveNeighbours(being);
  if (liveNeighbours < 2) {
    return false;
  }
  if ((liveNeighbours <= 3) && being.status === 'alive') {
    return true;
  }
  if (liveNeighbours > 3 && being.status === 'alive') {
    return false;
  }
  if (liveNeighbours === 3 && being.status === 'potential') {
    return true;
  }
  return false;
};

gol.World.prototype.removeAllNotWillAlive = function() {
  var willAliveBeings = [];
  var willAliveNeighbours = [];
  willAliveBeings = this.beings.filter(function(being) {
    return being.willAlive === true;
  });
  willAliveNeighbours = this.emptyNeighbours.filter(function(neighbour) {
    return neighbour.willAlive === true;
  });
  this.beings = willAliveBeings;
  this.emptyNeighbours = willAliveNeighbours;
};

gol.World.prototype.addAliveNeighbours = function(){
  var self = this;
  var point;
  var being;
  this.emptyNeighbours.forEach(function(aliveNeighbour) {
    point = aliveNeighbour.point;
    being = new gol.CreateBeing(point, 'alive');
    self.addBeing(being);
  });
};

gol.World.prototype.clearNeighbours = function() {
  this.emptyNeighbours = [];
};

gol.validateWorldMissing = function(world) {
  if (world === undefined) {
    throw new Error('Error: "world" argument is missing');
  }
};

gol.validateWorldObject = function(world) {
  if (!(world instanceof gol.World)) {
    throw new Error('Error: world argument must be a World object');
  }
};

gol.validateWorld = function(world) {
  gol.validateWorldMissing(world);
  gol.validateWorldObject(world);
};

gol.nextGen = function(world) {
  gol.validateWorld(world);
  if (world.beings.length === 0) return world;
  world.beings.forEach(function(being) {
    being.willAlive = (world.willAlive(being)) ? true : false;
  });
  world.setEmptyNeighbours();
  world.emptyNeighbours.forEach(function(neighbour) {
    neighbour.willAlive = (world.willAlive(neighbour)) ? true : false;
  });

  world.removeAllNotWillAlive();
  world.addAliveNeighbours();
  world.clearNeighbours();
  return world;
};

module.exports = gol;

