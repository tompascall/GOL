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

  it('should throw exception if "world" object has no "beings" property', function() {
    var message = 'Error: "world" object has no "beings" property';
    var world = {};
    expect(helper.testExceptionMessage(message, gol.nextGen, world)).to.be(true);
  });

  it('should throw exception if "being" property is not an array', function() {
    var message = 'Error: "beings" property must be an array';
    var world = {beings : ''};
    expect(helper.testExceptionMessage(message, gol.nextGen, world)).to.be(true);
  });
});

describe('generation next', function() {
  it('should give back "world" if there are zero beings', function(){
    var world = {beings : []};
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
    expect(being.stringCoord).to.be(x + ';' + y);
    expect(being.status).to.be('living');
    expect(being.type).to.be('simp');
  });

  it('should add a being to world', function() {
    var being = new gol.CreateBeing('simp', point);
    var world = {beings: []};
    gol.addBeing(being, world);
    expect(world.beings.length).to.be(1);
    expect(world.beings[0].stringCoord).to.be(x + ';' + y);
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
    var world = {beings: []};
    var message = 'Error: inappropriate value of being map dimensions or number of map elements';
    expect(helper.testExceptionMessage(message, gol.loadBeingsMap, beingsMap, world)).to.be(true);
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
    var world = {beings: []};
    gol.loadBeingsMap(beingsMap, world);
    expect(world.beings.length).to.be(5);
    expect(world.beings[0].stringCoord).to.be('2;1');
    expect(world.beings[3].stringCoord).to.be('3;2');
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
  var world = {beings: []};
  gol.loadBeingsMap(beingsMap, world);

  it('should get a being from world by a point', function() {
    var point = new gol.Point(2, 1);
    var being = gol.getBeing(point, world);
    expect(being).not.to.be(null);
    expect(being.stringCoord).to.be('2;1');
    expect(being.type).to.be('simp');
  });

  it('should add environment coords while creating being', function() {
    var point = new gol.Point(2, 1);
    var being = gol.getBeing(point, world);
    expect(being.envPoints).to.be.an('array');
    expect(being.envPoints.length).to.be(8);
    var neighbour;
    var neighbours = being.envPoints.filter(function(point) {
      neighbour = gol.getBeing(point, world);
      if (neighbour !== null){
        return neighbour.type === 'simp';
      }
      return false;
    });
    expect(neighbours.length).to.be(3);
  });
});

