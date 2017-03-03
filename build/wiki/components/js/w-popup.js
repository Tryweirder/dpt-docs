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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('../css/w-popup.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-popup');

var Popup = function (_React$Component) {
    _inherits(Popup, _React$Component);

    function Popup(props) {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

        _this.state = {
            shown: false
        };
        return _this;
    }

    _createClass(Popup, [{
        key: 'getDefaultProps',
        value: function getDefaultProps() {
            return {
                show: 'bottom-center',
                mode: 'click',
                size: 'M',
                autoClose: false,
                force: false,
                type: 'normal',
                tail: false,
                offset: 8
            };
        }
    }, {
        key: 'show',
        value: function show() {
            this.setState({ shown: true });
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ shown: false });
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.setState({ shown: !this.state.shown });
        }
    }, {
        key: 'setLocation',
        value: function setLocation() {}
    }, {
        key: 'handleTriggerClick',
        value: function handleTriggerClick() {
            if (this.props.mode === 'click') {
                if (this.props.force) {
                    this.show();
                } else {
                    this.toggle();
                }
            }
        }
    }, {
        key: 'handleTriggerMouseEnter',
        value: function handleTriggerMouseEnter() {
            if (this.props.mode === 'hover') {
                this.show();
            }
        }
    }, {
        key: 'handleTriggerMouseLeave',
        value: function handleTriggerMouseLeave() {
            if (this.props.mode === 'hover') {
                this.hide();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var propMods = _lodash2.default.pick(this.props, ['show', 'mode', 'size', 'type', 'tail']);
            var cn = b(_extends({ shown: this.state.shown }, propMods));

            var offsetStyle = {
                transform: 'translate(${this.props.offset}px, )'
            };

            var triggerEvents = {
                onClick: this.handleTriggerClick.bind(this),
                onMouseEnter: this.handleTriggerMouseEnter.bind(this),
                onMouseLeave: this.handleTriggerMouseLeave.bind(this)
            };

            var contentEvents = {
                onClick: this.handleClick.bind(this),
                onMouseLeave: this.handleMouseLeave.bind(this)
            };

            return _react2.default.createElement(
                'div',
                cn,
                _react2.default.createElement(
                    'div',
                    _extends({}, b('trigger'), { ref: 'trigger' }, triggerEvents),
                    this.props.trigger
                ),
                _react2.default.createElement(
                    'div',
                    _extends({}, b('offset'), { style: offsetStyle }),
                    _react2.default.createElement(
                        'div',
                        _extends({}, b('popup'), { ref: 'popup' }),
                        _react2.default.createElement('div', b('tail')),
                        _react2.default.createElement(
                            'div',
                            _extends({}, b('content'), contentEvents),
                            this.props.children
                        )
                    )
                )
            );
        }
    }]);

    return Popup;
}(_react2.default.Component);

exports.default = Popup;