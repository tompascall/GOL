// gol.spec.js
'use strict';

var expect = require('expect.js');
var gol = require('../src/gol.js');
var liveNeighbours;
var cell = {};


describe('unit tests', function(){
  it('should test the first rule', function(){
    // Any live cell with less than two live
    // neighbours dies, as if caused by under-population.
    liveNeighbours = 1;
    expect(gol.willAlive(cell, liveNeighbours)).to.be(false);
  });

  it('sholud test the second rule', function(){
    // Any live cell with two or three live neighbours
    // lives on to the next generation.
    cell = {live: true};
    liveNeighbours = 2;
    expect(gol.willAlive(cell, liveNeighbours)).to.be(true);
  });
});
