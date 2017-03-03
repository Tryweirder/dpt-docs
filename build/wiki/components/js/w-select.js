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

var _wButton = require('./w-button');

var _wButton2 = _interopRequireDefault(_wButton);

var _wMenu = require('./w-menu');

var _wMenu2 = _interopRequireDefault(_wMenu);

require('../css/w-select.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-select');

var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.state = {
            open: false
        };
        if (props.defaultValue) {
            _this.state.value = props.defaultValue;
        } else if (props.value === void 0) {
            var child = _react2.default.Children.toArray(props.children)[0];
            if (child) {
                if (child && child.type === Select.Group) {
                    var grandChild = _react2.default.Children.toArray(child.props.children)[0];
                    _this.state.value = grandChild.props.value;
                } else {
                    _this.state.value = child.props.value;
                }
            }
        }
        return _this;
    }

    _createClass(Select, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.select.style.width = this.refs.popup.offsetWidth + 5 + 'px';
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (nextState.open) {
                window.addEventListener('click', this.handleOutsideClick.bind(this));
            } else {
                window.removeEventListener('click', this.handleOutsideClick, false);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this.handleOutsideClick, false);
        }
    }, {
        key: 'handleOutsideClick',
        value: function handleOutsideClick(event) {
            if (event.target === window || this.refs.select && !this.refs.select.contains(event.target)) {
                this.setState({ open: false });
            }
        }
    }, {
        key: 'handleButtonClick',
        value: function handleButtonClick() {
            this.setState({ open: !this.state.open });
        }
    }, {
        key: 'handleMenuChange',
        value: function handleMenuChange(value) {
            var nextState = {
                open: this.props.multiple,
                value: this.props.value === void 0 ? value : void 0
            };
            this.setState(nextState);
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'label',
        value: function label() {
            var getItems = function getItems(children) {
                return _lodash2.default.flatten(_react2.default.Children.map(children, function (child) {
                    if (child.type === Select.Group) {
                        return getItems(child.props.children);
                    } else {
                        return child;
                    }
                }));
            };
            var labels = [];
            var value = this.value();

            _react2.default.Children.forEach(getItems(this.props.children), function (child, i) {
                if (child.props.value === value || Array.isArray(value) && value.includes(child.props.value)) {
                    labels.push(child.props.children || child.props.value);
                    labels.push(_react2.default.createElement(
                        'span',
                        { key: 'comma' + i },
                        ', '
                    ));
                }
            });

            labels.pop();

            return labels;
        }
    }, {
        key: 'value',
        value: function value() {
            return this.state.value || this.props.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var label = this.label();

            return _react2.default.createElement(
                'div',
                _extends({}, b(this), { ref: 'select' }),
                _react2.default.createElement(
                    _wButton2.default,
                    {
                        checked: this.state.open,
                        size: this.props.size,
                        controlled: true,
                        mode: 'dropdown',
                        type: 'button',
                        kind: this.props.kind,
                        onClick: this.handleButtonClick.bind(this)
                    },
                    label.length > 0 && label || this.props.placeholder
                ),
                _react2.default.createElement(
                    'div',
                    _extends({}, b('popup'), { ref: 'popup' }),
                    _react2.default.createElement(
                        _wMenu2.default,
                        {
                            type: 'select',
                            multiple: this.props.multiple,
                            value: this.value(),
                            onChange: this.handleMenuChange.bind(this)
                        },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return Select;
}(_react2.default.Component);

Select.defaultProps = {
    kind: 'normal',
    width: 'auto',
    multiple: false,
    size: 'M'
};
exports.default = Select;


Select.Group = _wMenu2.default.Group;

Select.Item = _wMenu2.default.Item;