// displayer.js

'use strict';

var gol = require('../src/gol.js');
var beingsMap = {
  map: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  // Gospel Glider Gun / http://en.wikipedia.org/wiki/Gun_(cellular_automaton) /
  width: 38,
  height: 11
};

function Displayer(width, height) {
  this.width = width;
  this.height = height;
  this.beingChar = '@';
  this.emptySpaceChar = '.';
  this.scope = this.clear();
  this.stringified = this.stringify();
}

Displayer.prototype.clear = function() {
  var scope = [];
  for (var i = 1; i <= this.height; i++) {
    for (var j = 1; j <= this.width; j++) {
      scope.push(this.emptySpaceChar);
      if (j === this.width) {
        scope.push('\n');
      }
    }
  }
  return scope;
};

Displayer.prototype.stringify = function() {
  return this.scope.join('');
};

Displayer.prototype.addWorld = function(world) {
  var index;
  var self = this;
  world.beings.forEach(function(being) {
    if (being.getY() < self.height && being.getX() < self.width) {
      index = being.getY() * (self.width + 1) + being.getX(); // +1 means '\n'
      self.scope[index] = self.beingChar;
    }
  });
};

Displayer.prototype.removeWorld = function(world) {
  var index;
  var self = this;
  world.beings.forEach(function(being) {
    if (being.getY() < self.height && being.getX() < self.width) {
      index = being.getY() * (self.width + 1) + being.getX(); // +1 means '\n'
      self.scope[index] = self.emptySpaceChar;
    }
  });
};

Displayer.prototype.display = function() {
  console.log(this.stringify());
};

var world = new gol.World();
world.loadBeingsMap(beingsMap);
var displayer = new Displayer(beingsMap.width + 10, beingsMap.height + 10);
displayer.addWorld(world);

displayer.display();
animate();

function animate(){
  displayer.display();
  setTimeout(function(){
    displayer.removeWorld(world);
    world = gol.nextGen(world);
    displayer.addWorld(world);
    clearDisplay();
    animate();
  }, 50);

  function clearDisplay(){
    console.log('\n\n\n\n\n\n\n\n\n\n' +
                '\n\n\n\n\n\n\n\n\n\n' +
                '\n\n\n\n\n\n\n\n\n\n' +
                '\n\n\n\n\n\n\n\n\n\n' +
                '\n\n\n\n\n\n\n\n\n\n');
  }
}
