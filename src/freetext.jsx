/** @jsx createElement */

import {Phrase, createElement} from 'lacona-phrase'
import Validator from 'lacona-phrase-validator'

export default class Freetext extends Phrase {
	static get defaultProps() {return {regex: /.*/}}

	checkRegex(input) {
		return input.match(this.props.regex)
	}

	describe() {
		if (this.props.children) {
			return (
				<choice limit={1}>
					<Validator validate={this.checkRegex.bind(this)}
						splitOn={this.props.splitOn} limit={this.props.limit} />
					{this.props.children[0]}
				</choice>
			)
		} else {
			return <Validator validate={this.checkRegex.bind(this)}
				splitOn={this.props.splitOn} limit={this.props.limit} />
		}
	}
}
