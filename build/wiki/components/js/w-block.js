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

var _wBlockHead = require('./w-block-head');

var _wBlockHead2 = _interopRequireDefault(_wBlockHead);

require('../css/w-block.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-block');

var Doc = function (_React$Component) {
    _inherits(Doc, _React$Component);

    function Doc(props) {
        _classCallCheck(this, Doc);

        var _this = _possibleConstructorReturn(this, (Doc.__proto__ || Object.getPrototypeOf(Doc)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Doc, [{
        key: 'loadBlockInfo',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(props) {
                var blockName, libName, response, platform;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                blockName = props.params.blockName;
                                libName = props.params.libName;
                                _context.next = 4;
                                return (0, _reqwest2.default)({
                                    url: '/api/wiki/libs/' + libName + '/' + blockName
                                });

                            case 4:
                                response = _context.sent;
                                platform = props.params.platform;


                                if (platform === void 0) {
                                    platform = response.platforms.default || (response.platforms.only || [])[0] || 'desktop';
                                }

                                if (props.params.version === void 0) {
                                    this.goToVersion(response.current, platform);
                                }

                                this.setState(_extends({
                                    loaded: true
                                }, response));

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadBlockInfo(_x) {
                return _ref.apply(this, arguments);
            }

            return loadBlockInfo;
        }()
    }, {
        key: 'goToVersion',
        value: function goToVersion(nextVersion, nextPlatform) {
            var libName = this.props.params.libName;
            var blockName = this.props.params.blockName;
            var version = nextVersion || this.props.params.version;
            var platform = nextPlatform || this.props.params.platform || 'desktop';

            this.props.history.pushState(null, '/wiki/libs/' + libName + '/' + blockName + '/' + version + '/' + platform);
        }
    }, {
        key: 'handleVersionChange',
        value: function handleVersionChange(nextVersion) {
            this.goToVersion(nextVersion);
        }
    }, {
        key: 'handlePlatformChange',
        value: function handlePlatformChange(nextPlatform) {
            this.goToVersion(null, nextPlatform);
        }
    }, {
        key: 'handleLoad',
        value: function handleLoad(event) {
            event.target.contentWindow.addEventListener('keydown', function (event) {
                window.dispatchEvent(new KeyboardEvent('keydown', event));
            });

            event.target.contentWindow.addEventListener('click', function (event) {
                window.dispatchEvent(new MouseEvent('click', event));
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadBlockInfo(this.props);
        }
    }, {
        key: 'handleSnapshotClick',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
                var blockName, libName, response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                event.preventDefault();
                                blockName = this.props.params.blockName;
                                libName = this.props.params.libName;
                                _context2.next = 5;
                                return (0, _reqwest2.default)({
                                    url: '/api/libs/' + libName + '/' + blockName + '/snapshot',
                                    method: 'POST'
                                });

                            case 5:
                                response = _context2.sent;


                                console.log(response);

                                this.loadBlockInfo(this.props);

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function handleSnapshotClick(_x2) {
                return _ref2.apply(this, arguments);
            }

            return handleSnapshotClick;
        }()
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var blockName = this.props.params.blockName;
            var libName = this.props.params.libName;

            var newBlockName = nextProps.params.blockName;
            var newLibName = nextProps.params.libName;

            if (newBlockName !== blockName || newLibName !== libName) {
                this.setState({ loaded: false });
                this.loadBlockInfo(nextProps);
            } else if (nextProps.params.version === void 0) {
                this.goToVersion(this.state.current);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.loaded) {
                var version = this.props.params.version || this.state.current;
                var platform = this.props.params.platform || 'desktop';
                var src = '/blocks/' + this.state.library + '/' + this.state.name + '/' + version + '/' + this.state.name + '.md?platform=' + platform + this.props.location.hash;

                var deprecationMessage = this.state.deprecated ? this.state.deprecated.message || 'Block is depricated' : null;

                return _react2.default.createElement(
                    'div',
                    b({ deprecated: this.state.deprecated !== void 0 }),
                    _react2.default.createElement(_wBlockHead2.default, {
                        path: this.state.path,
                        owner: this.state.owner,
                        currentPlatform: this.props.params.platform,
                        platforms: this.state.platforms,
                        onPlatformChange: this.handlePlatformChange.bind(this),
                        versions: this.state.versions,
                        currentVersion: this.props.params.version,
                        onVersionChange: this.handleVersionChange.bind(this),
                        onSnapshot: this.handleSnapshotClick.bind(this),
                        docSrc: src
                    }),
                    this.state.deprecated && _react2.default.createElement('div', _extends({}, b('deprecation-message'), {
                        dangerouslySetInnerHTML: { __html: deprecationMessage }
                    })),
                    _react2.default.createElement('iframe', _extends({}, b('content'), { src: src, onLoad: this.handleLoad.bind(this) }))
                );
            } else {
                return _react2.default.createElement('div', null);
            }
        }
    }]);

    return Doc;
}(_react2.default.Component);

exports.default = Doc;