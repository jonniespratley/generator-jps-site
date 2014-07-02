/* global describe, it, require */
var assert = require('assert');
describe('jps-site generator', function () {
	it('can be imported without blowing up', function () {
		var app = require('../app');
		assert(app !== void 0);
	});
});
