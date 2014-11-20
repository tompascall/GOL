// gol.js
'use strict';

var gol = {};

gol.willAlive = function(cell, livingNeighbours){
  if (livingNeighbours < 2 || livingNeighbours > 3) return false;
  if (cell.live && (livingNeighbours === 2 || livingNeighbours === 3)) {
    return true;
  }
  if (cell.live === false && livingNeighbours === 3) return true;
};

module.exports = gol;
