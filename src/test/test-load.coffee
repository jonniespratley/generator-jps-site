'use strict' 
#global describe, beforeEach, it
assert = require('assert')
require('chai').should()

describe 'jps-site generator', ->
	
	it 'can be imported without blowing up', ->
		app = require('../app')
		assert app isnt undefined
	