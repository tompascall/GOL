// gol.spec.js
'use strict';

var expect = require('expect.js');
var gol = require('../src/gol.js');

describe('unit tests', function(){
  it('should apply the first rule', function(){
    var livingNeighbours = 1;
    var cell;
    expect(gol.willAlive(cell, livingNeighbours)).to.be(false);
  });
});
