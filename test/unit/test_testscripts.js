/*
 * fly-transcription-testscripts
 * https://github.com/codingbash/fly-transcription-testscripts
 *
 * Copyright (c) 2015 codingbash
 * Licensed under the Apache-2.0 license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var testscripts = require('../');

describe('fly-transcription-testscripts module', function(){
  describe('#hello()', function(){
    it('should return a hello', function(){

      assert.equal(testscripts.hello('biojs'), ("hello biojs"));
      
      // alternative styles
      testscripts.hello('biojs').should.equal("hello biojs");
    });
  });
});
