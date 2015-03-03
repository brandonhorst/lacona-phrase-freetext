"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/** @jsx createElement */

var _laconaPhrase = require("lacona-phrase");

var Phrase = _laconaPhrase.Phrase;
var createElement = _laconaPhrase.createElement;

var Validator = _interopRequire(require("lacona-phrase-validator"));

var Freetext = (function (Phrase) {
	function Freetext() {
		_classCallCheck(this, Freetext);

		if (Phrase != null) {
			Phrase.apply(this, arguments);
		}
	}

	_inherits(Freetext, Phrase);

	_prototypeProperties(Freetext, null, {
		checkRegex: {
			value: function checkRegex(inputString, done) {
				done(null, inputString.match(this.props.regex));
			},
			writable: true,
			configurable: true
		},
		getDefault: {
			value: function getDefault(done) {
				done(null, this.props["default"]);
			},
			writable: true,
			configurable: true
		},
		getValue: {
			value: function getValue(result) {
				return result.value;
			},
			writable: true,
			configurable: true
		},
		describe: {
			value: function describe() {
				return createElement(Validator, { id: "value", validate: this.checkRegex.bind(this),
					"default": this.getDefault.bind(this), splitOn: this.props.splitOn,
					limit: this.props.limit });
			},
			writable: true,
			configurable: true
		}
	});

	return Freetext;
})(Phrase);

module.exports = Freetext;

Freetext.defaultProps = { regex: /.*/, "default": "" };