// gol.spec.js
'use strict';

var expect = require('expect.js');
var gol = require('../src/gol.js');
var liveNeighbours;
var cell = {};



describe('test rules', function(){
  afterEach(function(){
    cell = {};
  });

  it('should test the first rule', function(){
    // Any live cell with less than two live
    // neighbours dies, as if caused by under-population.
    liveNeighbours = 1;
    expect(gol.willAlive(cell, liveNeighbours)).to.be(false);
  });

  it('sholud test the second rule', function(){
    // Any live cell with two or three live neighbours
    // lives on to the next generation.
    cell.live = true;
    liveNeighbours = 2;
    expect(gol.willAlive(cell, liveNeighbours)).to.be(true);
    liveNeighbours = 3;
    expect(gol.willAlive(cell, liveNeighbours)).to.be(true);
  });

  it('should test the third rule', function(){
    // Any live cell with more than
    // three live neighbours dies, as if by overcrowding
    cell.live = true;
    liveNeighbours = 4;
    expect(gol.willAlive(cell, liveNeighbours)).to.be(false);
  });

  it('sholud test the fourth rule', function(){
    // Any dead cell with exactly three live neighbours
    // becomes a live cell, as if by reproduction
    cell.live = false;
    liveNeighbours = 3;
    expect(gol.willAlive(cell, liveNeighbours)).to.be(true);
  });
});

describe('test world', function(){

  it('should be true if the world is empty', function(){
    var world = new gol.World();
    expect(world.emptyWorld()).to.equal(true);
  });

  it('should add a cell to the world', function(){
     cell.x = 1;
     cell.y = 1;
     var world = new gol.World();
     world.addCell(cell);
     expect(world.emptyWorld()).to.equal(false);
  });

  it('should remove a cell from the world', function(){
    cell.x = 1;
    cell.y = 1;
    var world = new gol.World();
    world.addCell(cell);
    world.removeCell(cell);
    expect(world.emptyWorld()).to.equal(true);
  });
});
