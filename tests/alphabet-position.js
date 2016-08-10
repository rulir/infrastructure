'use strict';

let chai = require('chai');
let expect = chai.expect;

let alphabetPosition = require('../resources/alphabet-position');

let describe = require('mocha').describe;
let it = require('mocha').it;


describe('alphabet-position', function() {
	it('should return a string', function() {
		expect(alphabetPosition('абвгд')).to.be.a('string');
	});

	it('should return 1 2 3 4 5 from "абвгд"', function() {
		expect(alphabetPosition('абвгд')).to.be.equal('1 2 3 4 5');
	});

	it('should return empty string from "-=/8"', function() {
		expect(alphabetPosition('-=/8')).to.be.equal('');
	});
});