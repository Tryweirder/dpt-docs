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

require('../css/w-modal.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b = (0, _propmods2.default)('w-modal');

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
        _classCallCheck(this, Modal);

        return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
    }

    _createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('keydown', this.handleWindowKeyDown.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('keydown', this.handleWindowKeyDown);
        }
    }, {
        key: 'handleWindowKeyDown',
        value: function handleWindowKeyDown(event) {
            if (event.which === 27) {
                // Escape
                this.handleClose();
            }
        }
    }, {
        key: 'handleClose',
        value: function handleClose() {
            if (!this.props.force && this.props.onClose) {
                this.props.onClose();
            }
        }
    }, {
        key: 'handleFogClick',
        value: function handleFogClick(event) {
            if (event.target === this.refs.fog) {
                this.handleClose();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                b(this.props),
                _react2.default.createElement(
                    'div',
                    _extends({}, b('fog'), { onClick: this.handleFogClick.bind(this), ref: 'fog' }),
                    _react2.default.createElement(
                        'div',
                        b('content'),
                        this.props.children
                    )
                ),
                _react2.default.createElement(
                    'div',
                    b('controls'),
                    this.props.controls,
                    _react2.default.createElement(
                        'div',
                        _extends({}, b('close'), { onClick: this.handleClose.bind(this) }),
                        'Close'
                    )
                )
            );
        }
    }]);

    return Modal;
}(_react2.default.Component);

Modal.defaultProps = {
    force: false,
    showControls: false
};
exports.default = Modal;