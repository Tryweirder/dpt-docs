'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Loading;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.BROWSER) {
    require('../css/w-loading.less');
}

var b = (0, _propmods2.default)('w-loading');

function Loading(props) {
    return _react2.default.createElement(
        'div',
        b(),
        'Loading...'
    );
}