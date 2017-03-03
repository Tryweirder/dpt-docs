'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propmods = require('propmods');

var _propmods2 = _interopRequireDefault(_propmods);

var _fuzzaldrinPlus = require('fuzzaldrin-plus');

var _fuzzaldrinPlus2 = _interopRequireDefault(_fuzzaldrinPlus);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var _wInput = require('./w-input');

var _wInput2 = _interopRequireDefault(_wInput);

var _wLink = require('./w-link');

var _wLink2 = _interopRequireDefault(_wLink);

require('../css/w-search.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-search');

window.FuzzAldrin = _fuzzaldrinPlus2.default;

var Search = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search(props) {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

        _this.state = {
            open: false,
            clickable: false,
            focused: false,
            loaded: false,
            value: props.value || '',
            blocks: [],
            foundBlocks: [],
            selected: 0
        };
        return _this;
    }

    _createClass(Search, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            window.addEventListener('keydown', function (event) {
                if (event.shiftKey && event.ctrlKey && (event.keyCode === 80 || event.keyIdentifier === 'U+0050' || event.keyIdentifier === 'U+0417')) {

                    // This is to close any open modals
                    var _escape = new KeyboardEvent('keydown');
                    Object.defineProperty(_escape, 'which', { value: 27 });
                    window.dispatchEvent(_escape);

                    _this2.refs.input.focus();
                    _this2.refs.input.moveCursorToEnd();
                }
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.state.open && this.refs.selected) {
                var selectedOffset = this.refs.selected.offsetTop;
                var selectedBottom = this.refs.selected.offsetHeight + selectedOffset;

                var popupHeight = this.refs.popup.offsetHeight;
                var popupScroll = this.refs.popup.scrollTop;
                var popupBottom = popupHeight + popupScroll;

                if (selectedOffset < popupScroll) {
                    this.refs.popup.scrollTop = selectedOffset;
                }

                if (selectedBottom > popupBottom) {
                    this.refs.popup.scrollTop = selectedBottom - popupHeight;
                }
            }
        }
    }, {
        key: 'changeValue',
        value: function changeValue(value) {
            this.setState({
                value: value,
                selected: 0,
                foundBlocks: this.findBlocks(value)
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var _this3 = this;

            this.setState({ open: false, focused: false });
            setTimeout(function () {
                return _this3.setState({ clickable: false });
            }, 100);
        }
    }, {
        key: 'findBlocks',
        value: function findBlocks(query) {
            var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.blocks;

            if (query) {
                return _lodash2.default.sortBy(_fuzzaldrinPlus2.default.filter(blocks, query, { key: 'id' }), function (b) {
                    return -_fuzzaldrinPlus2.default.score(b.id, query);
                });
            } else {
                return blocks;
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            this.changeValue(event.target.value);
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (this.state.selected < this.state.foundBlocks.length - 1) {
                    this.setState({ selected: this.state.selected + 1 });
                }
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (this.state.selected > 0) {
                    this.setState({ selected: this.state.selected - 1 });
                }
            } else if (event.key === 'Escape') {
                this.refs.input.blur();
            } else if (event.key === 'Enter') {
                this.handleSelect(this.state.foundBlocks[this.state.selected]);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            this.close();
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(block) {
            this.changeValue('');
            this.props.onSelect(block);
            this.refs.input.blur();
        }
    }, {
        key: 'loadBlocks',
        value: function loadBlocks() {
            return (0, _reqwest2.default)({
                url: '/api/wiki/blocks'
            });
        }
    }, {
        key: 'open',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var nextState;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.setState({ focused: true });

                                nextState = {
                                    open: true,
                                    clickable: true
                                };

                                if (this.state.loaded) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 5;
                                return this.loadBlocks();

                            case 5:
                                nextState.blocks = _context.sent;

                                nextState.foundBlocks = this.findBlocks(this.state.value, nextState.blocks);
                                nextState.loaded = true;

                            case 8:

                                this.setState(nextState);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function open() {
                return _ref.apply(this, arguments);
            }

            return open;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var selected = this.state.selected;

            var blocks = this.state.foundBlocks.map(function (block, i) {
                return _react2.default.createElement(
                    'div',
                    _extends({}, b('block', { selected: i === selected }), {
                        ref: i === selected ? 'selected' : '',
                        key: block.id,
                        onClick: function onClick() {
                            return _this4.handleSelect(block);
                        }
                    }),
                    _react2.default.createElement(
                        'div',
                        b('block-name'),
                        block.name
                    ),
                    _react2.default.createElement(
                        'div',
                        b('block-library'),
                        block.library
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                _extends({}, b(this), { ref: 'search' }),
                _react2.default.createElement(_wInput2.default, {
                    size: 'S',
                    kind: this.state.focused ? 'normal' : 'pseudo-head',
                    value: this.state.value,
                    placeholder: 'Blocks Search \u2303\u21E7P',
                    onChange: this.handleChange.bind(this),
                    onKeyDown: this.handleKeyPress.bind(this),
                    onFocus: this.open.bind(this),
                    onBlur: this.handleBlur.bind(this),
                    ref: 'input',
                    style: { borderRadius: 2 }
                }),
                _react2.default.createElement(
                    'div',
                    _extends({}, b('popup'), { ref: 'popup' }),
                    blocks
                )
            );
        }
    }]);

    return Search;
}(_react2.default.Component);

exports.default = Search;