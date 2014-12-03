var lacona = require('lacona');
var freetext = require('../lib/freetext');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('sinon-chai'));

describe('lacona-phrase-freetext', function() {
	var parser;
	beforeEach(function() {
		parser = new lacona.Parser({sentences: ['test']});
		parser.sentences
	});

	it('handles an standalone, no-regex freetext', function(done) {
		var schema = {
			phrases: [{
				name: 'test',
				root: {
					type: 'freetext',
					id: 'test'
				}
			}],
			dependencies: [freetext]
		};


		var onData = sinon.spy(function(data) {
			expect(data.match[0].string).to.equal('anything');
			expect(data.result.test).to.equal('anything');
		});

		var onEnd = function() {
			expect(onData).to.have.been.called.once;
			done();
		};

		parser
		.understand(schema)
		.on('data', onData)
		.on('end', onEnd)
		.parse('anything');
	});

	it('handles a regex freetext', function(done) {
		var schema = {
			phrases: [{
				name: 'test',
				root: {
					type: 'freetext',
					regex: /anything/,
					id: 'test'
				}
			}],
			dependencies: [freetext]
		};


		var onData = sinon.spy(function(data) {
			expect(data.match[0].string).to.equal('anything');
			expect(data.result.test).to.equal('anything');
		});

		var onEnd = function() {
			expect(onData).to.have.been.called.once;
			done();
		};

		parser
		.understand(schema)
		.on('data', onData)
		.on('end', onEnd)
		.parse('anything');
	});

	it('handles a plain-text regex freetext', function(done) {
		var schema = {
			phrases: [{
				name: 'test',
				root: {
					type: 'freetext',
					regex: 'anything',
					id: 'test'
				}
			}],
			dependencies: [freetext]
		};


		var onData = sinon.spy(function(data) {
			expect(data.match[0].string).to.equal('anything');
			expect(data.result.test).to.equal('anything');
		});

		var onEnd = function() {
			expect(onData).to.have.been.called.once;
			done();
		};

		parser
		.understand(schema)
		.on('data', onData)
		.on('end', onEnd)
		.parse('anything');
	});

	it('suggests a default', function(done) {
		var schema = {
			phrases: [{
				name: 'test',
				root: {
					type: 'freetext',
					default: 'whatever',
					id: 'test'
				}
			}],
			dependencies: [freetext]
		};


		var onData = sinon.spy(function(data) {
			expect(data.suggestion.words[0].string).to.equal('whatever');
			expect(data.result.test).to.equal('whatever');
		});

		var onEnd = function() {
			expect(onData).to.have.been.called.once;
			done();
		};

		parser
		.understand(schema)
		.on('data', onData)
		.on('end', onEnd)
		.parse('');
	});

});
