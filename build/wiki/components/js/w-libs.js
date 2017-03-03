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

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var _wPane = require('./w-pane');

var _wPane2 = _interopRequireDefault(_wPane);

var _wLink = require('./w-link');

var _wLink2 = _interopRequireDefault(_wLink);

require('../css/w-libs.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('libs');

var Wiki = function (_React$Component) {
    _inherits(Wiki, _React$Component);

    function Wiki(props) {
        _classCallCheck(this, Wiki);

        var _this = _possibleConstructorReturn(this, (Wiki.__proto__ || Object.getPrototypeOf(Wiki)).call(this, props));

        _this.state = {
            loaded: false,
            libraries: [],
            blocks: []
        };
        return _this;
    }

    _createClass(Wiki, [{
        key: 'loadLibrariesList',
        value: function loadLibrariesList() {
            return (0, _reqwest2.default)({
                url: '/api/wiki/libs'
            });
        }
    }, {
        key: 'loadBlocksList',
        value: function loadBlocksList(libraryName) {
            return (0, _reqwest2.default)({
                url: '/api/wiki/libs/' + libraryName
            });
        }
    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var blocks, libraries;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                blocks = [];
                                _context.next = 3;
                                return this.loadLibrariesList();

                            case 3:
                                libraries = _context.sent;

                                if (!this.props.params.libName) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 7;
                                return this.loadBlocksList(this.props.params.libName);

                            case 7:
                                blocks = _context.sent.blocks;

                            case 8:

                                this.setState({
                                    libraries: libraries, blocks: blocks, loaded: true
                                });

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function componentDidMount() {
                return _ref.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentWillReceiveProps',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(nextProps) {
                var changes, blockNames, libraryNames;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                changes = {};
                                blockNames = this.state.blocks.map(function (b) {
                                    return b.name;
                                });

                                if (!(nextProps.params.libName !== this.props.params.libName || blockNames.indexOf(nextProps.params.blockName) < 0)) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.next = 5;
                                return this.loadBlocksList(nextProps.params.libName);

                            case 5:
                                changes.blocks = _context2.sent.blocks;

                            case 6:
                                libraryNames = this.state.libraries.map(function (l) {
                                    return l.name;
                                });

                                if (!(libraryNames.indexOf(nextProps.params.libName) < 0)) {
                                    _context2.next = 11;
                                    break;
                                }

                                _context2.next = 10;
                                return this.loadLibrariesList();

                            case 10:
                                changes.libraries = _context2.sent;

                            case 11:

                                this.setState(changes);

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function componentWillReceiveProps(_x) {
                return _ref2.apply(this, arguments);
            }

            return componentWillReceiveProps;
        }()
    }, {
        key: 'render',
        value: function render() {
            var libraries = this.state.libraries.filter(function (lib) {
                return !lib.hidden;
            }).map(function (lib) {
                return {
                    title: lib.name,
                    description: lib.title,
                    href: '/wiki/libs/' + lib.name
                };
            });

            var blocks = this.state.blocks.map(function (block) {
                return {
                    title: block.name,
                    description: block.title,
                    deprecated: block.deprecated,
                    href: '/wiki/libs/' + block.library + '/' + block.name
                };
            });

            var cover = this.context.depotConfig.cover;

            if (this.state.loaded) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, b(), { style: {
                            backgroundImage: !this.props.children && cover && 'url(' + cover + ')'
                        } }),
                    libraries.length > 0 && _react2.default.createElement(_wPane2.default, { items: libraries }),
                    blocks.length > 0 && this.props.params.libName && _react2.default.createElement(_wPane2.default, { items: blocks }),
                    this.props.children
                );
            } else {
                return _react2.default.createElement('div', b());
            }
        }
    }]);

    return Wiki;
}(_react2.default.Component);

Wiki.contextTypes = {
    depotConfig: _react2.default.PropTypes.object
};
exports.default = Wiki;