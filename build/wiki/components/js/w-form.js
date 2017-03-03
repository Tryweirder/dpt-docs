'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Form;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

require('../css/w-form.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b = (0, _propmods2.default)('w-form');

function Form(props) {
    return _react2.default.createElement(
        'form',
        _extends({}, b(props), props),
        props.flash && _react2.default.createElement(
            'div',
            b('flash'),
            props.flash
        ),
        props.children
    );
}

Form.defaultProps = {
    alignLabels: 'left'
};

Form.Fields = function (props) {
    return _react2.default.createElement(
        'div',
        b('fields'),
        props.children
    );
};

Form.Field = function (props) {
    return _react2.default.createElement(
        'div',
        b('field'),
        _react2.default.createElement(
            'div',
            b('label'),
            props.label
        ),
        _react2.default.createElement(
            'div',
            b('input'),
            props.children
        )
    );
};

Form.Bottom = function (props) {
    return _react2.default.createElement(
        'div',
        b('bottom'),
        props.children
    );
};