'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

require('../css/w-result.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b = (0, _propmods2.default)('w-result');

function Result(props) {
    var image = props.result === 'failure' ? '😢' : '😉';
    var title = props.result === 'failure' ? 'Doesn\'t make it' : 'Done';
    return _react2.default.createElement(
        'div',
        b(props),
        _react2.default.createElement(
            'figure',
            b('image'),
            image
        ),
        _react2.default.createElement(
            'h2',
            b('title'),
            title
        ),
        _react2.default.createElement(
            'div',
            b('message'),
            props.children
        )
    );
}