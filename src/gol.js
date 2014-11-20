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

gol.emptyWorld = function(world){
  return (world.length === 0) ? true : false;
};

gol.addCell = function(world, cell){
  world.push(cellCoord(cell));
  return world;

  function cellCoord(cell){
    return cell.x + ';' + cell.y;
  }
};

module.exports = gol;
