'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process.env.BROWSER) {
    require('../css/w-cut.less');
}

var b = (0, _propmods2.default)('w-cut');

var Cut = function (_React$Component) {
    _inherits(Cut, _React$Component);

    function Cut(props) {
        _classCallCheck(this, Cut);

        var _this = _possibleConstructorReturn(this, (Cut.__proto__ || Object.getPrototypeOf(Cut)).call(this, props));

        _this.state = {
            expanded: props.defaultExpanded || false
        };
        return _this;
    }

    _createClass(Cut, [{
        key: 'onClick',
        value: function onClick() {
            if (this.props.onClick) {
                this.props.onClick();
            } else if (this.props.expanded === void 0) {
                this.setState({
                    expanded: !this.state.expanded
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                b(this),
                _react2.default.createElement(
                    'div',
                    b('title'),
                    _react2.default.createElement(
                        'div',
                        _extends({}, b('trigger'), { onClick: function onClick() {
                                return _this2.onClick();
                            } }),
                        this.props.title || 'Show more'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    b('content'),
                    this.props.children
                )
            );
        }
    }]);

    return Cut;
}(_react2.default.Component);

exports.default = Cut;