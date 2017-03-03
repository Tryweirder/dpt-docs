'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = TOC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.BROWSER) {
    require('../css/w-toc.less');
}

var b = (0, _propmods2.default)('w-toc');

function TOC(props) {
    function handleItemClick(event) {
        event.preventDefault();
        window.parent.location.hash = event.target.getAttribute('href');
    }

    var headings = props.tokens.map(function (t) {
        var hash = '#' + t.id;
        return _react2.default.createElement(
            'li',
            _extends({}, b('item', { depth: t.depth }), { key: t.id }),
            _react2.default.createElement(
                'a',
                { href: hash, onClick: handleItemClick },
                t.children[0].value
            )
        );
    });
    return _react2.default.createElement(
        'ul',
        b(props),
        headings
    );
}