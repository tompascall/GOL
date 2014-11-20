// gol.js

'use strict';

var gol = {};



gol.willAlive = function(cell){
  if (cell.liveNeighbours < 2 || cell.liveNeighbours > 3) return false;
  if (cell.alive === true &&
    (cell.liveNeighbours === 2 || cell.liveNeighbours === 3)) {
      return true;
    }
  if (cell.alive === false && cell.liveNeighbours === 3) return true;
};

gol.Point = function(x, y){
  if (typeof x !== undefined) this.x = x;
  if (typeof y !== undefined) this.y = y;
};

gol.Point.prototype.getCoords = function(){
  return {x: this.x, y: this.y};
};

gol.Cell = function(point){
  this.coords = point.getCoords();
  // this.live = true;
};

gol.World = function(){
  this.table = [];
  this.neighbourMatrix = [
       {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
       {x: -1, y:  0},                {x: 1, y:  0},
       {x: -1, y:  1}, {x: 0, y:  1}, {x: 1, y:  1},
     ];
};

gol.World.prototype.countLivings = function(){
  var livings = this.table.filter(function(cell){
    return cell.alive;
  });
  return livings.length;
};

gol.World.prototype.countCells = function(){
  return this.table.length;
};

gol.World.prototype.emptyWorld = function(){
  return (this.countLivings() === 0) ? true : false;
};

gol.World.prototype.addCell = function(cell){
  this.table.push(cell);
};

gol.World.prototype.removeCell = function(cell){
  this.table = this.table.filter(function(elem){
    return (elem.x !== cell.coords.x) ||
      (elem.y !== cell.coords.y);
  });
};

gol.World.prototype.isAlive = function(point){
  var alive = false;
  this.table.forEach(function(elem){
    if (elem.coords.x === point.x && elem.coords.y === point.y && elem.alive) alive = true;
  });
  return alive;
};

gol.countLiveNeighbours = function(cell, world){
  var cellCoord = cell.coords;
  var point;
  var count = 0;

  world.neighbourMatrix.forEach(function(neigh){
    point = new gol.Point(cellCoord.x + neigh.x, cellCoord.y + neigh.y);
    if (world.isAlive(point)) count++;
  });
  return count;
};

gol.Scope = function(width, height){
  this.space = [];
  this.width = width;
  this.height = height;

  for (var i = 0; i < width; i++){
    for (var j = 0; j < height; j++){
      this.space.push(' ');
    }
  }
};

gol.Scope.prototype.length = function(){
  return this.space.length;
};

gol.Scope.prototype.seed = function(world, seed){
  var point;
  var cell;
  for (var i = 0; i < this.width; i++){
    for (var j = 0; j < this.height; j++){
      point = new gol.Point(i, j);
      if (seed[i * this.width + j]) {
        cell = new gol.Cell(point);
        cell.alive = true;
        world.addCell(cell);
      }
    }
  }
};

module.exports = gol;
