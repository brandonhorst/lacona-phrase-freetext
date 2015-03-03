/** @jsx createElement */

import {Phrase, createElement} from 'lacona-phrase'
import Validator from 'lacona-phrase-validator'

export default class Freetext extends Phrase {
	checkRegex(inputString, done) {
		done(null, inputString.match(this.props.regex))
	}

	getDefault(done) {
		done(null, this.props.default)
	}

	getValue(result) {
		return result.value
	}

	describe() {
		return <Validator id='value' validate={this.checkRegex.bind(this)}
			default={this.getDefault.bind(this)} splitOn={this.props.splitOn}
			limit={this.props.limit} />
	}
}
Freetext.defaultProps = {regex: /.*/, default: ''}
