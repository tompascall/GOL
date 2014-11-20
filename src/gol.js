// gol.js
'use strict';

var gol = {};

gol.willAlive = function(cell, liveNeighbours){
  if (liveNeighbours < 2 || liveNeighbours > 3) return false;
  if (cell.live === true && (liveNeighbours === 2 || liveNeighbours === 3)) {
    return true;
  }
  if (cell.live === false && liveNeighbours === 3) return true;
};

gol.World = function(){
  this.table = [];
};

gol.World.prototype.count = function(){
  return this.table.length;
};

gol.World.prototype.emptyWorld = function(){
  return (this.count() === 0) ? true : false;
};

gol.World.prototype.addCell = function(cell){
  cell = cell.x + ';' + cell.y;
  this.table.push(cell);
};

gol.World.prototype.removeCell = function(cell){
  cell = cell.x + ';' + cell.y;
  this.table = this.table.filter(function(elem){
    return elem !== cell;
  });
};

module.exports = gol;
