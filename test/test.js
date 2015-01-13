var chai = require('chai');
var expect = chai.expect;
var lacona = require('lacona');
var stream = require('stream');

var freetext = require('..');

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

describe('lacona-phrase-freetext', function() {
	var parser;

	beforeEach(function() {
		parser = new lacona.Parser();
	});

	it('handles an standalone, no-regex freetext', function(done) {
		var test = lacona.createPhrase({
			name: 'test/test',
			describe: function () {
				return freetext({id: 'test'});
			}
		});

		function callback(data) {
			expect(data).to.have.length(3);
			expect(data[1].data.match[0].string).to.equal('anything');
			expect(data[1].data.result.test).to.equal('anything');
			done();
		}

		parser.sentences = [test()];

		toStream(['anything'])
			.pipe(parser)
			.pipe(toArray(callback));
	});

	describe('regex', function () {
		var test;

		beforeEach(function () {
			test = lacona.createPhrase({
				name: 'test/test',
				describe: function () {
					return freetext({
						id: 'test',
						regex: /anything/
					});
				}
			});
		});

		it('accepts a regex', function(done) {
			function callback(data) {
				expect(data).to.have.length(3);
				expect(data[1].data.match[0].string).to.equal('anything');
				expect(data[1].data.result.test).to.equal('anything');
				done();
			}

			parser.sentences = [test()];
			toStream(['anything'])
				.pipe(parser)
				.pipe(toArray(callback));
		});

		it('rejects a regex', function(done) {
			function callback(data) {
				expect(data).to.have.length(2);
				done();
			}

			parser.sentences = [test()];
			toStream(['nothing'])
				.pipe(parser)
				.pipe(toArray(callback));
		});
	});

	it('suggests a default', function(done) {
		var test = lacona.createPhrase({
			name: 'test/test',
			describe: function () {
				return freetext({
					id: 'test',
					default: 'whatever'
				});
			}
		});

		function callback(data) {
			expect(data).to.have.length(3);
			expect(data[1].data.suggestion.words[0].string).to.equal('whatever');
			expect(data[1].data.result.test).to.equal('whatever');
			done();
		}

		parser.sentences = [test()];

		toStream([''])
			.pipe(parser)
			.pipe(toArray(callback));
	});

});
