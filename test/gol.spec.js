// gol.spec.js
'use strict';

var expect = require('expect.js');
var helper = require('../lib/testHelper/expectHelper.js');
var gol = require('../src/gol.js');

describe('world validation', function(){
  it('should throw exception if "world" object argument is missing', function(){
    var message = '"world" argument is missing';
    if (!helper.testExceptionMessage(message, gol.nexGen)) {
      expect().fail();
    }
  });
});
