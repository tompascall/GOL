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
    var message = 'Error: "beings" property must be a(n) array';
    var world = {beings : ''};
    expect(helper.testExceptionMessage(message, gol.nextGen, world)).to.be(true);
  });
});
