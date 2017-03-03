'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _history = require('history');

var _wWiki = require('./components/js/w-wiki');

var _wWiki2 = _interopRequireDefault(_wWiki);

var _wLibs = require('./components/js/w-libs');

var _wLibs2 = _interopRequireDefault(_wLibs);

var _wBlock = require('./components/js/w-block');

var _wBlock2 = _interopRequireDefault(_wBlock);

var _wProjects = require('./components/js/w-projects');

var _wProjects2 = _interopRequireDefault(_wProjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WikiRouter(props) {
    return _react2.default.createElement(
        _reactRouter.Router,
        { history: (0, _history.createHistory)() },
        _react2.default.createElement(_reactRouter.Redirect, { from: '/wiki', to: '/wiki/libs' }),
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/wiki', component: _wWiki2.default },
            _react2.default.createElement(
                _reactRouter.Route,
                { path: 'libs', component: _wLibs2.default },
                _react2.default.createElement(
                    _reactRouter.Route,
                    { path: ':libName' },
                    _react2.default.createElement(
                        _reactRouter.Route,
                        { path: ':blockName', component: _wBlock2.default },
                        _react2.default.createElement(_reactRouter.Redirect, { from: ':version', to: ':version/desktop' }),
                        _react2.default.createElement(
                            _reactRouter.Route,
                            { path: ':version' },
                            _react2.default.createElement(_reactRouter.Route, { path: ':platform' })
                        )
                    )
                )
            ),
            _react2.default.createElement(
                _reactRouter.Route,
                { path: 'projects', component: _wProjects2.default },
                _react2.default.createElement(_reactRouter.Route, { path: '*' })
            )
        )
    );
}

document.addEventListener('DOMContentLoaded', function () {
    return _reactDom2.default.render(_react2.default.createElement(WikiRouter, null), document.querySelector('#renderTarget'));
});