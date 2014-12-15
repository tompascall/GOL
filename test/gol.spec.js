// gol.spec.js
'use strict';

var expect = require('expect.js');
var helper = require('../lib/testHelper/expectHelper.js');
var gol = require('../src/gol.js');

describe('world validation', function(){
  it('should throw exception if "world" argument is missing', function(){
    var message = 'Error: "world" argument is missing';
    expect(helper.testExceptionMessage(message, gol.nextGen)).to.be(true);
  });

  it('should throw exception if "world" argument is not an object', function(){
    var message = 'Error: world argument must be an object';
    var world = 'foo';
    expect(helper.testExceptionMessage(message, gol.nextGen, world)).to.be(true);
  });

  it('should throw exception if "world" object has no "beings" property', function(){
    var message = 'Error: "world" object has no "beings" property';
    var world = {};
    expect(helper.testExceptionMessage(message, gol.nextGen, world)).to.be(true);
  });

  it('should throw exception if "being" property is not an array', function(){
    var message = 'Error: "beings" property must be an array';
    var world = {beings : ''};
    expect(helper.testExceptionMessage(message, gol.nextGen, world)).to.be(true);
  });
});

describe('generation next', function(){
  it('should give back "world" if there are zero beings', function(){
    var world = {beings : []};
    var nextGeneration = gol.nextGen(world);
    expect(nextGeneration).to.be(world);
  });
});

describe('create beings', function(){
  it('should create a point', function(){
    var x = 10;
    var y = 5;
    var point = new gol.Point(x, y);
    expect(point.x).to.be(x);
    expect(point.y).to.be(y);
  });

  it('should create a "simple" being', function(){
    var x = 10;
    var y = 5;
    var point = new gol.Point(x, y);
    var being = new gol.CreateBeing('simple', point);
    expect(being.stringified).to.be(x + ';' + y);
  });

  it('should add a being to world', function() {
    var x = 10;
    var y = 5;
    var point = new gol.Point(x, y);
    var being = new gol.CreateBeing('simple', point);
    var world = {beings: []};
    gol.addBeing(being, world);
    expect(world.beings.length).to.be(1);
    expect(world.beings[0].stringified).to.be(x + ';' + y);
  });
});

