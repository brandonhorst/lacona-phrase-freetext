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
				langs: ['default'],
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

	// it('handles an standalone, regex freetext (accepted)', function(done) {
	// 	var schema = {
	// 		root: {
	// 			type: 'freetext',
	// 			id: 'test'
	// 			regex =
	// 		},
	// 		sentence: true
	// 	};

	// 	var onData = chai.spy(function() {
	// 		expect(data.match[0].string).to.equal('result');
	// 		expect(data.result.test).to.equal('result');
	// 	});

	// 	var onEnd = function() {
	// 		expect(onData).to.have.been.called.once;
	// 		done();
	// 	};

	// 	new Parser()
	// 	.understand(testCase.).on('data', onData)
	// 	.on('end', onEnd)
	// 	.parse(testCase.input);
	// });
	// 		}, {
	// 			input: 'anything',
	// 			desc: 'regex (accepted)',
	// 			schema: {
	// 				root: {
	// 					type: 'freetext',
	// 					regex: /anything/
	// 				},
	// 				run: ''
	// 			},
	// 			result: 'anything',
	// 			matches: 1
	// 		}, {
	// 			input: 'anything',
	// 			desc: 'regex (rejected)',
	// 			schema: {
	// 				root: {
	// 					type: 'freetext',
	// 					regex: /nothing/
	// 				},
	// 				run: ''
	// 			},
	// 			matches: 0
	// 		}, {
	// 			input: 'anything',
	// 			desc: 'string regex',
	// 			schema: {
	// 				root: {
	// 					type: 'freetext',
	// 					regex: 'anything'
	// 				},
	// 				run: ''
	// 			},
	// 			result: 'anything',
	// 			matches: 1
	// 		}
	// 	];

	// 	async.each(testCases, function(testCase, done) {
	// 		var dataCalled;
	// 		dataCalled = chai.spy();
	// 		return new Parser().understand(testCase.schema).on('data', function(data) {
	// 			dataCalled();
	// 			expect(data, testCase.desc).to.exist;
	// 			expect(data.match, testCase.desc).to.exist;
	// 			expect(data.match, testCase.desc).to.have.length(1);
	// 			return expect(data.match[0].string, testCase.desc).to.equal(testCase.result);
	// 		}).on('end', function() {
	// 			expect(dataCalled, testCase.desc).to.have.been.called.exactly(testCase.matches);
	// 			return done();
	// 		}).parse(testCase.input);
	// 	}, done);
	// });

	// it('handles a freetext in a sequence', function(done) {
	// 	var dataCalled, testCase;
	// 	testCase = {
	// 		input: 'anything',
	// 		desc: 'anything',
	// 		schema: {
	// 			root: {
	// 				type: 'sequence',
	// 				separator: null,
	// 				children: [
	// 					{
	// 						type: 'freetext',
	// 						regex: /any/,
	// 						id: 'test'
	// 					}, 'thing'
	// 				]
	// 			},
	// 			run: ''
	// 		},
	// 		match: ['any', 'thing'],
	// 		result: {
	// 			test: 'any'
	// 		},
	// 		matches: 1
	// 	};
	// 	dataCalled = chai.spy();
	// 	return new Parser().understand(testCase.schema).on('data', function(data) {
	// 		var i, _i, _ref;
	// 		dataCalled();
	// 		expect(data, testCase.desc).to.exist;
	// 		expect(data.match, testCase.desc).to.exist;
	// 		for (i = _i = 0, _ref = testCase.match.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	// 			expect(data.match[i].string, testCase.desc).to.equal(testCase.match[i]);
	// 		}
	// 		return expect(data.result, testCase.desc).to.deep.equal(testCase.result);
	// 	}).on('end', function() {
	// 		expect(dataCalled, testCase.desc).to.have.been.called.exactly(testCase.matches);
	// 		return done();
	// 	}).parse(testCase.input);
	// });
});
