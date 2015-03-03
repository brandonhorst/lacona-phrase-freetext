/** @jsx createElement */
/* eslint-env mocha */

import es from 'event-stream'
import {expect} from 'chai'
import Freetext from '..'
import fulltext from 'lacona-util-fulltext'
import {Parser} from 'lacona'
import {createElement} from 'lacona-phrase'


describe('lacona-phrase-freetext', function() {
	var parser;

	beforeEach(function() {
		parser = new Parser();
	});

	it('handles an standalone, no-regex freetext', function(done) {
		function callback(err, data) {
			expect(data).to.have.length(3);
			expect(fulltext.match(data[1].data)).to.equal('anything');
			expect(data[1].data.result).to.equal('anything');
			done();
		}

		parser.sentences = [<Freetext />]

		es.readArray(['anything'])
			.pipe(parser)
			.pipe(es.writeArray(callback));
	});

	describe('regex', function () {
		it('accepts a regex', function(done) {
			function callback(err, data) {
				expect(data).to.have.length(3);
				expect(fulltext.match(data[1].data)).to.equal('anything');
				expect(data[1].data.result).to.equal('anything');
				done();
			}

			parser.sentences = [<Freetext regex={/anything/} />]
			es.readArray(['anything'])
				.pipe(parser)
				.pipe(es.writeArray(callback));
		});

		it('rejects a regex', function(done) {
			function callback(err, data) {
				expect(data).to.have.length(2);
				done();
			}

			parser.sentences = [<Freetext regex={/anything/} />]
			es.readArray(['nothing'])
				.pipe(parser)
				.pipe(es.writeArray(callback));
		});
	});

	it('suggests a default', function(done) {
		function callback(err, data) {
			expect(data).to.have.length(3);
			expect(fulltext.suggestion(data[1].data)).to.equal('whatever');
			expect(data[1].data.result).to.equal('whatever');
			done();
		}

		parser.sentences = [<Freetext default='whatever' />];

		es.readArray([''])
			.pipe(parser)
			.pipe(es.writeArray(callback));
	});

	it('completes a default', function(done) {
		function callback(err, data) {
			expect(data).to.have.length(3);
			expect(fulltext.completion(data[1].data)).to.equal('whatever');
			done();
		}

		parser.sentences = [
			<sequence>
				<literal text='test' />
				<Freetext default='whatever' />
			</sequence>
		]

		es.readArray(['te'])
			.pipe(parser)
			.pipe(es.writeArray(callback));
	});

	it('allows a literal after it (handles minimum first)', function(done) {
		function callback(err, data) {
			expect(data).to.have.length(4);

			expect(fulltext.match(data[1].data)).to.equal('abc');
			expect(fulltext.suggestion(data[1].data)).to.equal(' abc');

			expect(fulltext.match(data[2].data)).to.equal('abc a');
			expect(fulltext.suggestion(data[2].data)).to.equal(' abc');
			done();
		}

		parser.sentences = [
			<sequence>
				<Freetext />
				<literal text=' abc' />
			</sequence>
		]

		es.readArray(['abc a'])
			.pipe(parser)
			.pipe(es.writeArray(callback));
	});
});
