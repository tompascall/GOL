// gol.js

'use strict';

var gol = {};

gol.willAlive = function(cell){
  if (cell.liveNeighbours < 2 || cell.liveNeighbours > 3) return false;
  if (cell.live === true &&
    (cell.liveNeighbours === 2 || cell.liveNeighbours === 3)) {
      return true;
    }
  if (cell.live === false && cell.liveNeighbours === 3) return true;
};

gol.Cell = function(x, y){
  if (typeof x !== undefined) this.x = x;
  if (typeof y !== undefined) this.y = y;
  this.live = true;
};

gol.Cell.prototype.toString = function(){
  return this.x + ';' + this.y;
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
  this.table.push(cell.toString());
};

gol.World.prototype.removeCell = function(cell){
  this.table = this.table.filter(function(elem){
    return elem !== cell.toString();
  });
};

module.exports = gol;
