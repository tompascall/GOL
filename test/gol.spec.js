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
    cell.alive = true;
    cell.liveNeighbours = 1;
    expect(gol.willAlive(cell)).to.be(false);
  });

  it('sholud test the second rule', function(){
    // Any live cell with two or three live neighbours
    // lives on to the next generation.
    cell.alive = true;
    cell.liveNeighbours = 2;
    expect(gol.willAlive(cell)).to.be(true);
    cell.liveNeighbours = 3;
    expect(gol.willAlive(cell)).to.be(true);
  });

  it('should test the third rule', function(){
    // Any live cell with more than
    // three live neighbours dies, as if by overcrowding
    cell.alive = true;
    cell.liveNeighbours = 4;
    expect(gol.willAlive(cell)).to.be(false);
  });

  it('sholud test the fourth rule', function(){
    // Any dead cell with exactly three live neighbours
    // becomes a live cell, as if by reproduction
    cell.alive = false;
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
     expect(world.countCells()).to.equal(1);
  });

  it('should remove a cell from the world', function(){
    world.addCell(cell);
    world.removeCell(cell);
    expect(world.emptyWorld()).to.equal(true);
  });

  it('should get an alive cell by coordinate', function(){
    cell.alive = true;
    world.addCell(cell);
    expect(world.isAlive(point)).to.equal(true);
  });

  it ('should count live neighbours', function(){
    var neigh = new gol.Cell(new gol.Point(1, 2));
    cell.alive = true;
    neigh.alive = true;
    world.addCell(cell);
    world.addCell(neigh);
    expect(gol.countLiveNeighbours(cell, world)).to.equal(1);
  });
});

describe('scope', function(){
  var seed = [0, 0, 0, 0, 0,
              0, 0, 1, 0, 0,
              0, 0, 1, 0, 0,
              0, 0, 1, 0, 0,
              0, 0, 0, 0, 0];
  var scope;
  var cell;

  beforeEach(function(){
    world = new gol.World();
    scope = new gol.Scope(5, 5);
    scope.seed(world, seed);
  });

  it('should initialize scope', function(){
    scope.erase();
    expect(scope.length()).to.be.equal(scope.height *
      (scope.width + 1));
  });

  it('should seed the table', function(){
    var cell = new gol.Cell(new gol.Point(2, 2));
    expect(gol.countLiveNeighbours(cell, world)).to.equal(2);
  });

  it('should add adjacent dead cells to table', function(){
    world.addAdjacentDeadCellsToTable();
    expect(world.countCells()).to.be.equal(15);
  });

  it('should get a cell by a point', function(){
    var point;
    point = new gol.Point(2, 1);
    expect(world.getCell(point).alive).to.be(true);
  });

  it('should set live neighbours', function(){
    var point;
    world.addAdjacentDeadCellsToTable();
    world.setLiveNeighbours();
    point = new gol.Point(2, 0);
    expect(world.getCell(point).liveNeighbours).to.equal(1);
  });

  it('should generate the next generation', function(){
    gol.nextGen(world);
    cell = new gol.Cell(new gol.Point(0, 2));
    expect(gol.countLiveNeighbours(cell, world)).to.equal(1);
  });
});

describe('Display', function(){
  var seed = [0, 0, 0, 0, 0,
              0, 0, 1, 0, 0,
              0, 0, 1, 0, 0,
              0, 0, 1, 0, 0,
              0, 0, 0, 0, 0];
  var scope;
  var cell;
  var world;

  beforeEach(function(){
    world = new gol.World();
    scope = new gol.Scope(5, 5);
    scope.seed(world, seed);
  });

  it('should get number of live cells from scope', function(){
    scope.erase();
    scope.space[0] = scope.liveChar;
    expect(scope.getNumberOfLiveCells()).to.equal(1);
  });

  it('should set the scope by the table', function(){
    scope.setScopeByTable(world);
    expect(scope.getNumberOfLiveCells()).to.equal(3);
  });

  it('should convert scope.space array to string', function(){
    var space;
    scope.setScopeByTable(world);
    space = scope.toString();
    expect(space).to.be.a('string');
    expect(space.length).to.equal(scope.height *
      (scope.width + 1));
  });
  it('should display the space', function(){
    scope.setScopeByTable(world);
    scope.display();
    expect(scope.show).to.be(true);
  });
});




