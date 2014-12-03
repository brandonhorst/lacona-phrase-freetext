var lutil = require('lacona-util');

module.exports = {
	scope: {
		checkRegex: function (inputString, done) {
			var regex;

			if (this.regex) {
				if (this.regex instanceof RegExp) {
					regex = new RegExp('^' + this.regex.toString().slice(1, -1) + '$');
				}
				else {
					regex = new RegExp('^' + this.regex + '$');
				}
			}

			done(null, !regex || inputString.match(regex));
		},
		getDefault: function (done) {
			done(null, this.default || '');
		}
	},
	phrases: [{
		name: 'freetext',
		version: '0.3.0',
		schemas: [{
			langs: ['default'],
			root: {
				type: 'validator',
				validate: 'checkRegex',
				default: 'getDefault',
				id: '@value'
			}
		}]
	}],
	dependencies: [
		require('lacona-phrase-validator')
	]
};
