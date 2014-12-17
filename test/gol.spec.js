// gol.spec.js
'use strict';

var expect = require('expect.js');
var helper = require('../lib/testHelper/expectHelper.js');
var gol = require('../src/gol.js');

describe('world validation', function(){
  it('should throw exception if "world" argument is missing', function() {
    var message = 'Error: "world" argument is missing';
    expect(helper.testExceptionMessage(message, gol.nextGen)).to.be(true);
  });

  it('should throw exception if "world" argument is not an object', function() {
    var message = 'Error: world argument must be an object';
    var world = 'foo';
    expect(helper.testExceptionMessage(message, gol.nextGen, world)).to.be(true);
  });
});

describe('generation next', function() {
  it('should give back "world" if there are zero beings', function(){
    var world = new gol.World();
    var nextGeneration = gol.nextGen(world);
    expect(nextGeneration).to.be(world);
  });
});

describe('create beings', function() {
  var x = 10;
  var y = 5;
  var point = new gol.Point(x, y);

  it('should create a point', function(){
    expect(point.x).to.be(x);
    expect(point.y).to.be(y);
  });

  it('should create a "simp" being', function() {
    var being = new gol.CreateBeing('simp', point);
    expect(being.point.stringCoord).to.be(x + ';' + y);
    expect(being.type).to.be('simp');
  });

  it('should add a being to world', function() {
    var being = new gol.CreateBeing('simp', point);
    var world = new gol.World();
    world.addBeing(being);
    expect(world.beings.length).to.be(1);
    expect(world.beings[0].point.stringCoord).to.be(x + ';' + y);
  });

  it('should validate beings map', function(){
    var beingsMap = {
      map: [
        '0', 's', '0',
        's', 's', 's',
        '0', 's', '0'
      ],
      width: 3,
      height: 2,
      startX: 0,
      startY: 0
    };
    var world = new gol.World();
    var message = 'Error: inappropriate value of being map dimensions or number of map elements';
    expect(helper.testExceptionMessage(message, world.loadBeingsMap, beingsMap)).to.be(true);
  });

  it('should load beings to world', function() {
    var beingsMap = {
      map: [
        '0',    '0',    '0',    '0',    '0',
        '0',    '0',    'simp', '0',    '0',
        '0',    'simp', 'simp', 'simp', '0',
        '0',    '0',    'simp', '0',    '0',
        '0',    '0',    '0',    '0',    '0'
      ],
      width: 5,
      height: 5,
      startX: 0,
      startY: 0
    };
    var world = new gol.World();
    world.loadBeingsMap(beingsMap);
    expect(world.beings.length).to.be(5);
    expect(world.beings[0].point.stringCoord).to.be('2;1');
    expect(world.beings[3].point.stringCoord).to.be('3;2');
  });
});

describe('neighbours', function() {
  var beingsMap = {
      map: [
        '0',    '0',    '0',    '0',    '0',
        '0',    '0',    'simp', '0',    '0',
        '0',    'simp', 'simp', 'simp', '0',
        '0',    '0',    'simp', '0',    '0',
        '0',    '0',    '0',    '0',    '0'
      ],
      width: 5,
      height: 5,
      startX: 0,
      startY: 0
    };
  var world = new gol.World();
  world.loadBeingsMap(beingsMap);

  it('should get a being from world by a point', function() {
    var point = new gol.Point(2, 1);
    var being = world.getBeing(point);
    expect(being).not.to.be(null);
    expect(being.point.stringCoord).to.be('2;1');
    expect(being.type).to.be('simp');
  });

  it('should add environment coords while creating being', function() {
    var point = new gol.Point(2, 1);
    var being = world.getBeing(point);
    expect(being.envPoints).to.be.an('array');
    expect(being.envPoints.length).to.be(8);
  });

  it('should get an array of neighbours coords that has a given type', function() {
    var point = new gol.Point(2, 1);
    var being = world.getBeing(point);
    var simpsPoints = world.getNeighsPointsByType(being, 'simp');
    expect(simpsPoints.length).to.be(3);
  });

  it('should set points of empty neighbours in world', function() {
    world.setEmptyNeighsPoints();
    expect(world.emptyNeighsPoints.length).to.be(16);
  });

  it('should set empty neighbours in world', function() {
    world.setEmptyNeighbours();
    expect(world.emptyNeighbours.length).to.be(16);
  });

  it('should count live neighbours', function() {
    var point = new gol.Point(2, 1);
    var being = world.getBeing(point);
    var liveNeighbours = world.countLiveNeighbours(being);
    expect(liveNeighbours).to.be(3);
  });
});

describe('rules', function() {
  var beingsMap = {
      map: [
        '0',    '0',    '0',   '0',    '0',    '0',
        'simp', 'simp', '0',   'simp', '0',    '0',
        'simp', 'simp', '0',   'simp', '0',    '0',
        'simp', '0',    '0',   'simp', '0',    '0',
        '0',    '0',    '0',   '0',    '0',    '0'
      ],
      width: 6,
      height: 5,
      startX: 0,
      startY: 0
    };
  var world = new gol.World();
  world.loadBeingsMap(beingsMap);

  it('should apply the first rule', function() {
    var point = new gol.Point(3, 1);
    var being = world.getBeing(point);
    var willAlive = world.willAlive(being);
    expect(willAlive).to.be(false);
  });

  it('should apply the second rule', function() {
    var point = new gol.Point(3, 2);
    var being = world.getBeing(point);
    var willAlive = world.willAlive(being);
    expect(willAlive).to.be(true);
  });

  it('should apply the third rule', function() {
    var point = new gol.Point(1, 2);
    var being = world.getBeing(point);
    var willAlive = world.willAlive(being);
    expect(willAlive).to.be(false);
  });

  it('should apply the fourth rule', function() {
    var point = new gol.Point(4, 2);
    var emptyNeighbour = new gol.CreateBeing('0', point, 'potential');
    var willAlive = world.willAlive(emptyNeighbour);
    expect(willAlive).to.be(true);
  });
});

