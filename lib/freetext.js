var _ = require('lodash');
var lutil = require('lacona-util');

module.exports = {
	scope: {
		checkRegex: function (inputString, data, done) {
			var regex;
			var substrings = lutil.substrings(inputString);
			var l = substrings.length;
			var stringPart;
			var i;

			if (this.regex) {
				if (_.isRegExp(this.regex)) {
					regex = new RegExp('^' + this.regex.toString().slice(1, -1) + '$');
				}
				else {
					regex = new RegExp('^' + this.regex + '$');
				}
			}

			for (i=0; i < l; i++) {
				stringPart = substrings[i];
				if (!regex || stringPart.match(regex)) {
					data({
						display: stringPart,
						value: stringPart
					});
				}
			}
			done();
		}
	},
	phrases: [{
		name: 'freetext',
		version: '0.3.0',
		schemas: [{
			langs: ['default'],
			root: {
				type: 'value',
				compute: 'checkRegex',
				id: '@value'
			}
		}]
	}]
}
