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

require('../css/w-menu.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-menu');

var valueType = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.string]);

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.state = {
            value: props.defaultValue
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                menuValue: this.state.value || this.props.value,
                handleItemClick: this.handleItemClick.bind(this)
            };
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (!_lodash2.default.isEqual(this.state.value, nextState.value) && this.props.onChange) {
                this.props.onChange(nextState.value);
            }
        }
    }, {
        key: 'handleItemClick',
        value: function handleItemClick(itemValue, itemChildren, wasChecked) {
            var newValue = void 0;
            if (this.props.multiple) {
                if (wasChecked) {
                    newValue = this.state.value.filter(function (v) {
                        return v !== itemValue;
                    });
                } else {
                    newValue = this.state.value.concat([itemValue]);
                }
            } else {
                newValue = itemValue;
            }
            this.setState({ value: newValue });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                b(this),
                this.props.children
            );
        }
    }]);

    return Menu;
}(_react2.default.Component);

Menu.childContextTypes = {
    menuValue: valueType,
    handleItemClick: _react2.default.PropTypes.func
};
Menu.propTypes = {
    size: _react2.default.PropTypes.oneOf(['M']),
    type: _react2.default.PropTypes.oneOf(['normal', 'select']),
    multiple: _react2.default.PropTypes.bool,
    defaultValue: valueType,
    value: valueType,
    onChange: _react2.default.PropTypes.func
};
Menu.defaultProps = {
    size: 'M',
    type: 'normal',
    multiple: false
};
exports.default = Menu;

var Group = function (_React$Component2) {
    _inherits(Group, _React$Component2);

    function Group() {
        _classCallCheck(this, Group);

        return _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).apply(this, arguments));
    }

    _createClass(Group, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'li',
                b('group', { hasTitle: !!this.props.title }),
                this.props.title && _react2.default.createElement(
                    'div',
                    b('title'),
                    this.props.title
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    this.props.children
                )
            );
        }
    }]);

    return Group;
}(_react2.default.Component);

Menu.Group = Group;

var Item = function (_React$Component3) {
    _inherits(Item, _React$Component3);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
        key: 'handleClick',
        value: function handleClick() {
            var fn = this.props.onClick || this.context.handleItemClick;
            if (fn) {
                fn(this.props.value, this.props.children, this.props.checked);
            }
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            return this.context.menuValue === this.props.value || Array.isArray(this.context.menuValue) && this.context.menuValue.includes(this.props.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var icon = _react2.default.createElement('div', _extends({}, b('icon'), { style: { background: 'url(' + this.props.icon + ')' } }));
            return _react2.default.createElement(
                'li',
                _extends({}, b('item', this.props, { checked: this.isChecked() }), { onClick: this.handleClick.bind(this) }),
                _react2.default.createElement('div', b('tick')),
                this.props.icon && icon,
                this.props.children || this.props.value
            );
        }
    }]);

    return Item;
}(_react2.default.Component);

Item.propTypes = {
    checked: _react2.default.PropTypes.bool
};
Item.contextTypes = {
    menuValue: valueType,
    handleItemClick: _react2.default.PropTypes.func
};


Menu.Item = Item;