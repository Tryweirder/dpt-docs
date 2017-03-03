'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var Router = _interopRequireWildcard(_reactRouter);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

require('../css/w-link.less');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-link');

var Link = function (_React$Component) {
    _inherits(Link, _React$Component);

    function Link() {
        _classCallCheck(this, Link);

        return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
    }

    _createClass(Link, [{
        key: 'isExternal',
        value: function isExternal() {
            var r = new RegExp('^(?:[a-z]+:)?//', 'i');
            return this.props.external || r.test(this.props.href);
        }
    }, {
        key: 'render',
        value: function render() {
            var cn = b({ 'has-icon': this.props.icon !== void 0 });
            var style = {};
            if (this.props.icon) {
                style.backgroundImage = 'url(' + this.props.icon + ')';
            }

            if (this.isExternal()) {
                return _react2.default.createElement(
                    'a',
                    _extends({}, cn, this.props),
                    _react2.default.createElement('div', _extends({}, b('icon'), { style: style })),
                    this.props.children
                );
            } else {
                return _react2.default.createElement(
                    Router.Link,
                    _extends({}, cn, { activeClassName: 'w-link_active', to: this.props.href }, this.props),
                    _react2.default.createElement('div', _extends({}, b('icon'), { style: style })),
                    this.props.children
                );
            }
        }
    }]);

    return Link;
}(_react2.default.Component);

Link.propTypes = {
    href: _react2.default.PropTypes.string.isRequired
};
exports.default = Link;