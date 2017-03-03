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

var _wForm = require('./w-form');

var _wForm2 = _interopRequireDefault(_wForm);

var _wInput = require('./w-input');

var _wInput2 = _interopRequireDefault(_wInput);

var _wSelect = require('./w-select');

var _wSelect2 = _interopRequireDefault(_wSelect);

var _wButton = require('./w-button');

var _wButton2 = _interopRequireDefault(_wButton);

var _wResult = require('./w-result');

var _wResult2 = _interopRequireDefault(_wResult);

require('../css/w-new-library.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-new-library');

var NewBlock = function (_React$Component) {
    _inherits(NewBlock, _React$Component);

    function NewBlock(props) {
        _classCallCheck(this, NewBlock);

        var _this = _possibleConstructorReturn(this, (NewBlock.__proto__ || Object.getPrototypeOf(NewBlock)).call(this, props));

        _this.state = {
            loaded: false
        };
        return _this;
    }

    _createClass(NewBlock, [{
        key: 'componentDidMount',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var libraries;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _reqwest2.default)({
                                    url: '/api/wiki/libs'
                                });

                            case 2:
                                libraries = _context.sent;


                                this.setState({
                                    loaded: true,
                                    libraries: libraries
                                });

                            case 4:
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
        key: 'handleSubmit',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
                var _this2 = this;

                var form, response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                event.preventDefault();
                                form = {};

                                ['libname', 'libtitle'].forEach(function (ref) {
                                    return form[ref] = _this2.refs[ref].value();
                                });
                                _context2.next = 5;
                                return (0, _reqwest2.default)({
                                    url: '/api/wiki/libs/',
                                    method: 'POST',
                                    contentType: 'application/json',
                                    data: JSON.stringify(form)
                                });

                            case 5:
                                response = _context2.sent;


                                this.setState({ flash: response.error && response.error.message });

                                if (response.error === void 0 && this.props.onSuccess) {
                                    this.props.onSuccess(response);
                                }

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function handleSubmit(_x) {
                return _ref2.apply(this, arguments);
            }

            return handleSubmit;
        }()
    }, {
        key: 'render',
        value: function render() {
            if (this.state.loaded) {
                var libraries = this.state.libraries.map(function (l) {
                    return _react2.default.createElement(_wSelect2.default.Item, { value: l.name, key: l.name });
                });

                return _react2.default.createElement(
                    'div',
                    b(this),
                    _react2.default.createElement(
                        'h2',
                        b('title'),
                        'Creating library'
                    ),
                    _react2.default.createElement(
                        _wForm2.default,
                        { mix: 'w-new-library__form', flash: this.state.flash, onSubmit: this.handleSubmit.bind(this) },
                        _react2.default.createElement(
                            _wForm2.default.Fields,
                            null,
                            _react2.default.createElement(
                                _wForm2.default.Field,
                                { label: 'Lib name' },
                                _react2.default.createElement(_wInput2.default, { required: true, ref: 'libname' })
                            ),
                            _react2.default.createElement(
                                _wForm2.default.Field,
                                { label: 'Description' },
                                _react2.default.createElement(_wInput2.default, { required: true, ref: 'libtitle' })
                            )
                        ),
                        _react2.default.createElement(
                            _wForm2.default.Bottom,
                            null,
                            _react2.default.createElement(
                                _wButton2.default,
                                { kind: 'action', type: 'submit' },
                                'Create'
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement('div', null);
            }
        }
    }]);

    return NewBlock;
}(_react2.default.Component);

exports.default = NewBlock;