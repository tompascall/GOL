// gol.spec.js
'use strict';

var expect = require('expect.js');
var gol = require('../src/gol.js');
var point;
var cell;
var world;

describe('test rules', function(){

  beforeEach(function(){
    point = new gol.Point(1, 1);
    cell = new gol.Cell(point);
  });

  it('should test the first rule', function(){
    // Any live cell with less than two live
    // neighbours dies, as if caused by under-population.
    cell.liveNeighbours = 1;
    expect(gol.willAlive(cell)).to.be(false);
  });

  it('sholud test the second rule', function(){
    // Any live cell with two or three live neighbours
    // lives on to the next generation.
    cell.liveNeighbours = 2;
    expect(gol.willAlive(cell)).to.be(true);
    cell.liveNeighbours = 3;
    expect(gol.willAlive(cell)).to.be(true);
  });

  it('should test the third rule', function(){
    // Any live cell with more than
    // three live neighbours dies, as if by overcrowding
    cell.liveNeighbours = 4;
    expect(gol.willAlive(cell)).to.be(false);
  });

  it('sholud test the fourth rule', function(){
    // Any dead cell with exactly three live neighbours
    // becomes a live cell, as if by reproduction
    cell.live = false;
    cell.liveNeighbours = 3;
    expect(gol.willAlive(cell)).to.be(true);
  });
 });

describe('test world', function(){

  beforeEach(function(){
    point = new gol.Point(1, 1);
    cell = new gol.Cell(point);
    world = new gol.World();
  });

  it('should be true if the world is empty', function(){
    expect(world.emptyWorld()).to.equal(true);
  });

  it('should add a cell to the world', function(){
     world.addCell(cell);
     expect(world.emptyWorld()).to.equal(false);
  });

  it('should remove a cell from the world', function(){
    world.addCell(cell);
    world.removeCell(cell);
    expect(world.emptyWorld()).to.equal(true);
  });

  it('should get a cell by coordinate', function(){
    world.addCell(cell);
    expect(world.isAlive(point)).to.equal(true);
  });

  it ('should count live neighbours', function(){
    var neigh = new gol.Cell(new gol.Point(1, 2));
    world.addCell(cell);
    world.addCell(neigh);
    expect(gol.countNeighbours(cell, world)).to.equal(1);
  });
});




