var lacona = require('lacona');
var freetext = require('..');

var stream = require('stream');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

function toArray(done) {
	var newStream = new stream.Writable({objectMode: true});
	var list = [];
	newStream.write = function(obj) {
		list.push(obj);
	};

	newStream.end = function() {
		done(list);
	};

	return newStream;
}

function toStream(strings) {
	var newStream = new stream.Readable({objectMode: true});

	strings.forEach(function (string) {
		newStream.push(string);
	});
	newStream.push(null);

	return newStream;
}

chai.use(require('sinon-chai'));

describe('lacona-phrase-freetext', function() {
	var parser;
	beforeEach(function() {
		parser = new lacona.Parser({sentences: ['test']});
	});

	it('handles an standalone, no-regex freetext', function(done) {
		var grammar = {
			phrases: [{
				name: 'test',
				root: {
					type: 'freetext',
					id: 'test'
				}
			}],
			dependencies: [freetext]
		};

		function callback(data) {
			expect(data).to.have.length(3);
			expect(data[1].data.match[0].string).to.equal('anything');
			expect(data[1].data.result.test).to.equal('anything');
			done();
		}

		parser.understand(grammar);
		toStream(['anything'])
			.pipe(parser)
			.pipe(toArray(callback));
	});

	it('handles a regex freetext', function(done) {
		var grammar = {
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

		function callback(data) {
			expect(data).to.have.length(3);
			expect(data[1].data.match[0].string).to.equal('anything');
			expect(data[1].data.result.test).to.equal('anything');
			done();
		}

		parser.understand(grammar);
		toStream(['anything'])
			.pipe(parser)
			.pipe(toArray(callback));
	});

	it('handles a plain-text regex freetext', function(done) {
		var grammar = {
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

		function callback(data) {
			expect(data).to.have.length(3);
			expect(data[1].data.match[0].string).to.equal('anything');
			expect(data[1].data.result.test).to.equal('anything');
			done();
		}

		parser.understand(grammar);
		toStream(['anything'])
		.pipe(parser)
		.pipe(toArray(callback));
	});

	it('suggests a default', function(done) {
		var grammar = {
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

		function callback(data) {
			expect(data).to.have.length(3);
			expect(data[1].data.suggestion.words[0].string).to.equal('whatever');
			expect(data[1].data.result.test).to.equal('whatever');
			done();
		}

		parser.understand(grammar);
		toStream([''])
		.pipe(parser)
		.pipe(toArray(callback));
	});

});
