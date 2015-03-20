"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/** @jsx createElement */

var _laconaPhrase = require("lacona-phrase");

var Phrase = _laconaPhrase.Phrase;
var createElement = _laconaPhrase.createElement;

var Validator = _interopRequire(require("lacona-phrase-validator"));

var Freetext = (function (_Phrase) {
	function Freetext() {
		_classCallCheck(this, Freetext);

		if (_Phrase != null) {
			_Phrase.apply(this, arguments);
		}
	}

	_inherits(Freetext, _Phrase);

	_createClass(Freetext, {
		checkRegex: {
			value: function checkRegex(input) {
				return input.match(this.props.regex);
			}
		},
		describe: {
			value: function describe() {
				if (this.props.children) {
					return createElement(
						"choice",
						{ limit: 1 },
						createElement(Validator, { validate: this.checkRegex.bind(this),
							splitOn: this.props.splitOn, limit: this.props.limit }),
						this.props.children[0]
					);
				} else {
					return createElement(Validator, { validate: this.checkRegex.bind(this),
						splitOn: this.props.splitOn, limit: this.props.limit });
				}
			}
		}
	}, {
		defaultProps: {
			get: function () {
				return { regex: /.*/ };
			}
		}
	});

	return Freetext;
})(Phrase);

module.exports = Freetext;