'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

require('../../../vendor/beast');

var _wLoading = require('./w-loading');

var _wLoading2 = _interopRequireDefault(_wLoading);

var _wCut = require('./w-cut');

var _wCut2 = _interopRequireDefault(_wCut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process.env.BROWSER) {
    var cookie = require('cookie_js').cookie;
    require('../css/w-example.less');

    document.addEventListener('DOMContentLoaded', maintainScroll);
}

var b = (0, _propmods2.default)('w-example');

function maintainScroll() {
    var previousScroll = cookie.get('scrollPosition');
    if (previousScroll) {
        window.scrollTo(window.scrollX, previousScroll);
    }
}

var Example = function (_React$Component) {
    _inherits(Example, _React$Component);

    function Example(props) {
        _classCallCheck(this, Example);

        var _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this, props));

        _this.state = {
            loaded: false
        };
        return _this;
    }

    _createClass(Example, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.src) {
                var node = eval(Beast.parseBML(this.props.code));
                this.setState({
                    loaded: true
                });

                var dom = this.refs.example;

                node.render(dom);

                setTimeout(maintainScroll, 0);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var parts = this.props.lang.split('_');

            var _parts = _slicedToArray(parts, 3),
                lang = _parts[0],
                modName = _parts[1],
                _parts$ = _parts[2],
                modValue = _parts$ === undefined ? true : _parts$;

            var mods = modName = _defineProperty({}, modName, modValue);

            var style = {
                width: this.props.width,
                height: this.props.height
            };

            var result = void 0;

            if (this.props.src) {
                var src = this.props.src + '?platform=' + this.props.platform;
                result = _react2.default.createElement(
                    'div',
                    b(this),
                    _react2.default.createElement('iframe', _extends({}, b('content'), { src: src, style: style, ref: 'example' }))
                );
            } else {
                result = _react2.default.createElement(
                    'div',
                    _extends({}, b(this, mods), { style: style }),
                    _react2.default.createElement(
                        'div',
                        b('preloader'),
                        _react2.default.createElement(_wLoading2.default, null)
                    ),
                    _react2.default.createElement('div', _extends({}, b('content'), { ref: 'example' })),
                    _react2.default.createElement(
                        'div',
                        b('code'),
                        _react2.default.createElement(
                            _wCut2.default,
                            { title: 'Show the code' },
                            _react2.default.createElement(
                                'div',
                                b('code-content'),
                                this.props.code
                            )
                        )
                    )
                );
            }

            return result;
        }
    }]);

    return Example;
}(_react2.default.Component);

exports.default = Example;