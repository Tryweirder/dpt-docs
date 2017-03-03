'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var _wPage = require('./w-page');

var _wPage2 = _interopRequireDefault(_wPage);

var _wLink = require('./w-link');

var _wLink2 = _interopRequireDefault(_wLink);

var _wLoading = require('./w-loading');

var _wLoading2 = _interopRequireDefault(_wLoading);

var _wSearch = require('./w-search');

var _wSearch2 = _interopRequireDefault(_wSearch);

var _wModal = require('./w-modal');

var _wModal2 = _interopRequireDefault(_wModal);

var _wNewBlock = require('./w-new-block');

var _wNewBlock2 = _interopRequireDefault(_wNewBlock);

var _wNewLibrary = require('./w-new-library');

var _wNewLibrary2 = _interopRequireDefault(_wNewLibrary);

require('../css/w-wiki.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-wiki');

var Wiki = function (_React$Component) {
    _inherits(Wiki, _React$Component);

    function Wiki(props) {
        _classCallCheck(this, Wiki);

        var _this = _possibleConstructorReturn(this, (Wiki.__proto__ || Object.getPrototypeOf(Wiki)).call(this, props));

        _this.state = {
            loaded: false,
            newBlockFormOpen: false,
            newLibraryFormOpen: false,
            depotConfig: {}
        };
        return _this;
    }

    _createClass(Wiki, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                isLocal: window.location.hostname === 'localhost',
                depotConfig: this.state.depotConfig
            };
        }
    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var depotConfig;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                depotConfig = void 0;
                                _context.prev = 1;
                                _context.next = 4;
                                return this.loadDepotConfig();

                            case 4:
                                depotConfig = _context.sent;
                                _context.next = 11;
                                break;

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context['catch'](1);

                                console.error('Could not load Depot config. Check config.yaml file at the root of your Depot.');
                                return _context.abrupt('return');

                            case 11:

                                this.setState({
                                    loaded: true,
                                    depotConfig: depotConfig
                                });

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 7]]);
            }));

            function componentDidMount() {
                return _ref.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'handleFindBlock',
        value: function handleFindBlock(block) {
            this.props.history.pushState(null, '/wiki/libs/' + block.library + '/' + block.name);
        }
    }, {
        key: 'handleNewBlockClick',
        value: function handleNewBlockClick() {
            this.setState({
                newBlockFormOpen: true
            });
        }
    }, {
        key: 'handleNewLibraryClick',
        value: function handleNewLibraryClick() {
            this.setState({
                newLibraryFormOpen: true
            });
        }
    }, {
        key: 'handleNewBlockFormClose',
        value: function handleNewBlockFormClose() {
            this.setState({
                newBlockFormOpen: false
            });
        }
    }, {
        key: 'handleNewLibraryFormClose',
        value: function handleNewLibraryFormClose() {
            this.setState({
                newLibraryFormOpen: false
            });
        }
    }, {
        key: 'handleNewBlockSuccess',
        value: function handleNewBlockSuccess(response) {
            this.handleNewBlockFormClose();
            this.props.history.pushState(null, '/wiki/libs/' + response.lib + '/' + response.block + '/');
        }
    }, {
        key: 'handleNewLibrarySuccess',
        value: function handleNewLibrarySuccess(response) {
            this.handleNewLibraryFormClose();
            this.props.history.pushState(null, '/wiki/libs/' + response.libname + '/');
        }
    }, {
        key: 'loadDepotConfig',
        value: function loadDepotConfig() {
            return (0, _reqwest2.default)({
                url: '/api/wiki/config'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.loaded) {
                return _react2.default.createElement(
                    _wPage2.default,
                    null,
                    _react2.default.createElement(
                        'div',
                        b(),
                        _react2.default.createElement(Head, {
                            depotConfig: this.state.depotConfig,
                            location: this.props.location,
                            history: this.props.history,
                            blocks: this.state.blocks,
                            onFindBlock: this.handleFindBlock.bind(this),
                            onNewBlockClick: this.handleNewBlockClick.bind(this),
                            onNewLibraryClick: this.handleNewLibraryClick.bind(this)
                        }),
                        _react2.default.createElement(
                            _wModal2.default,
                            { padded: true, open: this.state.newBlockFormOpen, onClose: this.handleNewBlockFormClose.bind(this) },
                            _react2.default.createElement(_wNewBlock2.default, {
                                currentLibrary: this.props.params.libName,
                                onSuccess: this.handleNewBlockSuccess.bind(this)
                            })
                        ),
                        _react2.default.createElement(
                            _wModal2.default,
                            { padded: true, open: this.state.newLibraryFormOpen, onClose: this.handleNewLibraryFormClose.bind(this) },
                            _react2.default.createElement(_wNewLibrary2.default, {
                                currentLibrary: this.props.params.libName,
                                onSuccess: this.handleNewLibrarySuccess.bind(this)
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            b('content'),
                            this.props.children
                        )
                    )
                );
            } else {
                return _react2.default.createElement(_wLoading2.default, null);
            }
        }
    }]);

    return Wiki;
}(_react2.default.Component);

Wiki.childContextTypes = {
    isLocal: _react2.default.PropTypes.bool,
    depotConfig: _react2.default.PropTypes.object
};
exports.default = Wiki;


function Head(props) {
    var isLocal = window.location.hostname === 'localhost';
    var pathname = props.history.createHref(props.location.pathname, props.location.query);
    var hash = props.location.hash;
    return _react2.default.createElement(
        'div',
        b('head', { local: isLocal }),
        _react2.default.createElement(
            Head.Group,
            { main: true },
            _react2.default.createElement(
                'div',
                b('title'),
                _react2.default.createElement(
                    _wLink2.default,
                    { href: '/wiki' },
                    props.depotConfig.name || 'Депо'
                )
            ),
            _react2.default.createElement(
                'ul',
                b('menu'),
                _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    _react2.default.createElement(
                        _wLink2.default,
                        { href: '/wiki/libs' },
                        'Blocks'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    _react2.default.createElement(
                        _wLink2.default,
                        { target: '_blank', href: '/wiki/projects' },
                        'Projects'
                    )
                )
            ),
            _react2.default.createElement(
                'ul',
                b('menu'),
                _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    _react2.default.createElement(_wSearch2.default, { blocks: props.blocks, onSelect: props.onFindBlock })
                )
            ),
            isLocal && _react2.default.createElement(
                'ul',
                b('menu'),
                _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    _react2.default.createElement(
                        _wLink2.default,
                        { href: '#', onClick: props.onNewBlockClick },
                        'Create Block'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    _react2.default.createElement(
                        _wLink2.default,
                        { href: '#', onClick: props.onNewLibraryClick },
                        'Create Library'
                    )
                )
            )
        ),
        _react2.default.createElement(
            Head.Group,
            null,
            _react2.default.createElement(
                'ul',
                b('menu'),
                props.depotConfig.repository && _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    _react2.default.createElement(
                        _wLink2.default,
                        { href: props.depotConfig.repository },
                        'GitHub'
                    )
                ),
                props.depotConfig.docs && _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    _react2.default.createElement(
                        _wLink2.default,
                        { href: props.depotConfig.docs },
                        'Quick Start'
                    )
                )
            ),
            _react2.default.createElement(
                'ul',
                b('menu'),
                _react2.default.createElement(
                    'li',
                    b('menu-item'),
                    isLocal ? props.depotConfig.url && _react2.default.createElement(
                        _wLink2.default,
                        { href: props.depotConfig.url + pathname + hash },
                        'To Public Version'
                    ) : props.depotConfig.port && _react2.default.createElement(
                        _wLink2.default,
                        { href: 'http://localhost:' + props.depotConfig.port + pathname + hash },
                        'To Local Version'
                    )
                )
            )
        )
    );
}

Head.Group = function (props) {
    var cn = b('head-group', { main: props.main });
    return _react2.default.createElement(
        'div',
        cn,
        props.children
    );
};