'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

require('../css/w-page.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b = (0, _propmods2.default)('page');

var Page = _react2.default.createClass({
    displayName: 'Page',
    componentWillMount: function componentWillMount() {
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/assets/icons/favicon.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        if (this.props.title) {
            document.title = this.props.title;
        }
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            _extends({}, b(), this.props),
            this.props.children
        );
    }
});

exports.default = Page;