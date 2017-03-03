'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

var _wExample = require('./w-example');

var _wExample2 = _interopRequireDefault(_wExample);

var _wMarkdown = require('./w-markdown');

var _wMarkdown2 = _interopRequireDefault(_wMarkdown);

var _wToc = require('./w-toc');

var _wToc2 = _interopRequireDefault(_wToc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process.env.BROWSER) {
    var cookie = require('cookie_js').cookie;
    cookie.expiresMultiplier = 1;
    require('../css/w-doc.less');
}

var b = (0, _propmods2.default)('w-doc');

var Renderer = function (_Markdown$Renderer) {
    _inherits(Renderer, _Markdown$Renderer);

    function Renderer() {
        _classCallCheck(this, Renderer);

        return _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).apply(this, arguments));
    }

    _createClass(Renderer, [{
        key: 'code',
        value: function code(props) {
            if (props.lang.match(/^bml/)) {
                return _react2.default.createElement(_wExample2.default, { lang: props.lang, platform: props.platform, code: props.value });
            } else {
                return _get(Renderer.prototype.__proto__ || Object.getPrototypeOf(Renderer.prototype), 'code', this).call(this, props);
            }
        }
    }, {
        key: 'example',
        value: function example(props) {
            return _react2.default.createElement(_wExample2.default, _extends({}, props, { code: props.value }));
        }
    }, {
        key: 'link',
        value: function link(props) {
            return _react2.default.createElement('a', _extends({ target: '_blank' }, props));
        }
    }]);

    return Renderer;
}(_wMarkdown2.default.Renderer);

var renderer = new Renderer();

var Doc = function (_React$Component) {
    _inherits(Doc, _React$Component);

    function Doc() {
        _classCallCheck(this, Doc);

        return _possibleConstructorReturn(this, (Doc.__proto__ || Object.getPrototypeOf(Doc)).apply(this, arguments));
    }

    _createClass(Doc, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('beforeunload', function (e) {
                cookie.set('scrollPosition', window.scrollY, {
                    expires: 15
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var tocTokens = this.props.ast.children.filter(function (t) {
                return t.type === 'heading' && t.depth > 1 && t.depth < 4;
            });
            return _react2.default.createElement(
                'div',
                b(this),
                _react2.default.createElement(_wToc2.default, _extends({}, b('toc'), { tokens: tocTokens })),
                _react2.default.createElement(_wMarkdown2.default, _extends({}, b('content'), { ast: this.props.ast, renderer: renderer }))
            );
        }
    }]);

    return Doc;
}(_react2.default.Component);

exports.default = Doc;


if (typeof window !== 'undefined') {
    window.React = _react2.default;
    window.ReactDOM = _reactDom2.default;
    window.Doc = Doc;
}