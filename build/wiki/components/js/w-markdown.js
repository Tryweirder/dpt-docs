'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
    function Renderer() {
        _classCallCheck(this, Renderer);
    }

    _createClass(Renderer, [{
        key: 'text',
        value: function text(props) {
            return props.value;
        }
    }, {
        key: 'root',
        value: function root(props) {
            return _react2.default.createElement('div', _lodash2.default.omit(props, ['position']));
        }
    }, {
        key: 'paragraph',
        value: function paragraph(props) {
            return _react2.default.createElement('p', props);
        }
    }, {
        key: 'blockquote',
        value: function blockquote(props) {
            return _react2.default.createElement('blockquote', props);
        }
    }, {
        key: 'heading',
        value: function heading(props) {
            return _react2.default.createElement('h' + props.depth, _lodash2.default.omit(props, ['depth', 'text']));
        }
    }, {
        key: 'code',
        value: function code(props) {
            return _react2.default.createElement(
                'pre',
                null,
                _react2.default.createElement(
                    'code',
                    null,
                    props.value
                )
            );
        }
    }, {
        key: 'inlineCode',
        value: function inlineCode(props) {
            return _react2.default.createElement('code', null, props.value);
        }
    }, {
        key: 'yaml',
        value: function yaml(props) {
            return null;
        }
    }, {
        key: 'html',
        value: function html(props) {
            return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: props.value } });
        }
    }, {
        key: 'list',
        value: function list(props) {
            return _react2.default.createElement(props.ordered ? 'ol' : 'ul', _lodash2.default.omit(props, ['ordered', 'start', 'loose']));
        }
    }, {
        key: 'listItem',
        value: function listItem(props) {
            return _react2.default.createElement('li', _lodash2.default.omit(props, ['loose', 'checked']));
        }
    }, {
        key: 'table',
        value: function table(props) {
            return _react2.default.createElement('table', props);
        }
    }, {
        key: 'tableHeader',
        value: function tableHeader(props) {
            return _react2.default.createElement('thead', props);
        }
    }, {
        key: 'tableRow',
        value: function tableRow(props) {
            return _react2.default.createElement('tr', props);
        }
    }, {
        key: 'tableCell',
        value: function tableCell(props) {
            return _react2.default.createElement('td', props);
        }
    }, {
        key: 'horizontalRule',
        value: function horizontalRule(props) {
            return _react2.default.createElement('hr', props);
        }
    }, {
        key: 'lineBreak',
        value: function lineBreak(props) {
            // break
            return _react2.default.createElement('br', props);
        }
    }, {
        key: 'emphasis',
        value: function emphasis(props) {
            return _react2.default.createElement('em', props);
        }
    }, {
        key: 'strong',
        value: function strong(props) {
            return _react2.default.createElement('strong', props);
        }
    }, {
        key: 'del',
        value: function del(props) {
            // delete
            return _react2.default.createElement('del', props);
        }
    }, {
        key: 'link',
        value: function link(props) {
            return _react2.default.createElement('a', props);
        }
    }, {
        key: 'image',
        value: function image(props) {
            return _react2.default.createElement('img', props);
        }
    }, {
        key: 'footnote',
        value: function footnote(props) {
            return _react2.default.createElement('footnote', props);
        }
    }, {
        key: 'linkReference',
        value: function linkReference(props) {
            return null;
        }
    }, {
        key: 'imageReference',
        value: function imageReference(props) {
            return null;
        }
    }, {
        key: 'footnoteReference',
        value: function footnoteReference(props) {
            return null;
        }
    }, {
        key: 'definition',
        value: function definition(props) {
            return null;
        }
    }, {
        key: 'footnoteDefinition',
        value: function footnoteDefinition(props) {
            return null;
        }
    }, {
        key: 'escape',
        value: function escape(props) {
            return null;
        }
    }, {
        key: 'renderNode',
        value: function renderNode(node) {
            var _this = this;

            if (node.children) {
                node.children = node.children.map(function (n) {
                    return _this.renderNode(n);
                });
            }

            var type = node.type;

            if (node.url) {
                if (node.type === 'image') {
                    node.src = node.url;
                } else {
                    node.href = node.url;
                }
                delete node.url;
            }

            if (this[type]) {
                delete node.type;
            }

            switch (type) {
                case 'break':
                    return this.lineBreak(node);
                case 'delete':
                    return this.del(node);
                default:
                    if (this[type]) {
                        return this[type](_lodash2.default.omit(node, ['position']));
                    } else {
                        console.warn('Unknown Markdown node type "' + node.type + '" at ' + node.position.start.line + ':' + node.position.start.column);
                    }
            }
        }
    }, {
        key: 'render',
        value: function render(root) {
            return this.renderNode(_lodash2.default.cloneDeep(root));
        }
    }]);

    return Renderer;
}();

var Markdown = function (_React$Component) {
    _inherits(Markdown, _React$Component);

    function Markdown() {
        _classCallCheck(this, Markdown);

        return _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).apply(this, arguments));
    }

    _createClass(Markdown, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _lodash2.default.omit(this.props, ['ast', 'renderer']),
                this.props.renderer.render(this.props.ast)
            );
        }
    }]);

    return Markdown;
}(_react2.default.Component);

Markdown.propTypes = {
    ast: _react2.default.PropTypes.object.isRequired,
    renderer: _react2.default.PropTypes.instanceOf(Renderer).isRequired
};
Markdown.defaultProps = {
    renderer: new Renderer()
};
exports.default = Markdown;


Markdown.Renderer = Renderer;