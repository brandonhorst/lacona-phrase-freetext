/** @jsx createElement */
/* eslint-env mocha */

import {expect} from 'chai'
import Freetext from '..'
import fulltext from 'lacona-util-fulltext'
import {Parser} from 'lacona'
import {createElement} from 'lacona-phrase'

function from(i) {const a = []; for (let x of i) a.push(x); return a}

describe('lacona-phrase-freetext', () => {
	var parser

	beforeEach(() => {
		parser = new Parser()
	})

	it('handles an standalone, no-regex freetext', () => {
		parser.sentences = [<Freetext />]

		const data = from(parser.parse('anything'))
		expect(data).to.have.length(1)
		expect(fulltext.match(data[0])).to.equal('anything')
		expect(data[0].result).to.equal('anything')
	})

	describe('regex', function () {
		it('accepts a regex', () => {
			parser.sentences = [<Freetext regex={/anything/} />]
			const data = from(parser.parse('anything'))
			expect(data).to.have.length(1)
			expect(fulltext.match(data[0])).to.equal('anything')
			expect(data[0].result).to.equal('anything')
		})

		it('rejects a regex', () => {
			parser.sentences = [<Freetext regex={/anything/} />]
			const data = from(parser.parse('nothing'))
			expect(data).to.have.length(0)
		})
	})

	it('suggests a default', () => {
		parser.sentences = [
			<Freetext>
				<literal text='whatever' value='whatValue' />
			</Freetext>
		]

		const data = from(parser.parse(''))
		expect(data).to.have.length(1)
		expect(fulltext.suggestion(data[0])).to.equal('whatever')
		expect(data[0].result).to.equal('whatValue')
	})

	it('completes a default', () => {
		parser.sentences = [
			<sequence>
				<literal text='test' />
				<Freetext id='free'>
					<literal text='whatever' value='whatValue' />
				</Freetext>
			</sequence>
		]

		const data = from(parser.parse('te'))
		expect(data).to.have.length(1)
		expect(fulltext.completion(data[0])).to.equal('whatever')
		expect(data[0].result.free).to.equal('whatValue')
	})

	it('allows a literal after it (handles minimum first)', () => {
		parser.sentences = [
			<sequence>
				<Freetext />
				<literal text=' abc' />
			</sequence>
		]

		const data = from(parser.parse('abc a'))
		expect(data).to.have.length(2)
		expect(fulltext.match(data[0])).to.equal('abc')
		expect(fulltext.suggestion(data[0])).to.equal(' abc')
		expect(fulltext.match(data[1])).to.equal('abc a')
		expect(fulltext.suggestion(data[1])).to.equal(' abc')
	})
})
