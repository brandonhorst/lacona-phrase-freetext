var lacona = require('lacona');
var validator = require('lacona-phrase-validator');

module.exports = lacona.createPhrase({
	name: 'lacona/freetext',
	getDefaultProps: function () {
		return {
			regex: /.*/,
			default: ''
		};
	},
	checkRegex: function (inputString, done) {
		done(null, inputString.match(this.props.regex));
	},
	getDefault: function (done) {
		done(null, this.props.default);
	},
	getValue: function (result) {
		return result.value;
	},
	describe: function () {
		return validator({
			id: 'value',
			validate: this.checkRegex,
			default: this.getDefault
		});
	}
});
