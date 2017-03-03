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

var _wLink = require('./w-link');

var _wLink2 = _interopRequireDefault(_wLink);

require('../css/w-button.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-button');

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.state = { clicked: false };
        if (props.defaultChecked !== void 0) {
            _this.state.checked = _this.props.defaultChecked;
        }
        return _this;
    }

    _createClass(Button, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (nextState.checked !== this.state.checked && this.props.onChange) {
                this.props.onChange(nextState.checked);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            this.setState({ clicked: false });
            if (this.props.onBlur) this.props.onBlur();
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onClick) {
                this.props.onClick(event);
            }

            if (!event.defaultPrevented) {
                var nextState = { clicked: true };
                var isCheckable = ['check', 'clear-check'].includes(this.props.kind);
                var isDropDown = this.props.mode === 'dropdown';
                if (this.state.checked !== void 0 && (isCheckable || isDropDown)) {
                    nextState.checked = !this.state.checked;
                }

                this.setState(nextState);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var component = this.props.href ? _wLink2.default : 'button';

            return _react2.default.createElement(component, _extends({}, b(this, { iconOnly: this.props.icon && this.props.children === void 0 }), this.props, {
                onClick: this.handleClick.bind(this),
                onBlur: this.handleBlur.bind(this),
                ref: 'button'
            }), this.props.icon && _react2.default.createElement('div', _extends({}, b('icon'), {
                style: {
                    backgroundImage: 'url(' + this.props.icon + ')'
                }
            })), this.props.children && _react2.default.createElement('div', b('label'), this.props.children), ['dropdown', 'next', 'back'].includes(this.props.mode) && _react2.default.createElement('div', b('arrow')), this.props.mode === 'close' && _react2.default.createElement('div', b('close')));
        }
    }]);

    return Button;
}(_react2.default.Component);

Button.defaultProps = {
    kind: 'normal',
    size: 'M',
    mode: 'button',
    disabled: false
};
exports.default = Button;