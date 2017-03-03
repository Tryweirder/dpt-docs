'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Pane;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

var _wLink = require('./w-link');

var _wLink2 = _interopRequireDefault(_wLink);

require('../css/w-pane.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b = (0, _propmods2.default)('w-pane');

function Pane(props) {
    return _react2.default.createElement(
        'ul',
        b(),
        props.items.map(function (i) {
            return _react2.default.createElement(Pane.Item, _extends({ key: i.title + i.description }, i));
        })
    );
}

Pane.Item = function (props) {
    var item = _react2.default.createElement(
        'li',
        b('item', { deprecated: props.deprecated !== void 0 }),
        _react2.default.createElement(
            'div',
            b('item-title'),
            props.title
        ),
        _react2.default.createElement(
            'div',
            b('item-description'),
            props.description
        )
    );

    if (props.href) {
        return _react2.default.createElement(
            _wLink2.default,
            { href: props.href },
            item
        );
    } else {
        return item;
    }
};