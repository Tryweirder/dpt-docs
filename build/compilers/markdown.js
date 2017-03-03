'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _remark = require('remark');

var _remark2 = _interopRequireDefault(_remark);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

var _yamlJs = require('yaml-js');

var _yamlJs2 = _interopRequireDefault(_yamlJs);

var _file = require('dpt/lib/file');

var File = _interopRequireWildcard(_file);

var _wDoc = require('../wiki/components/js/w-doc.js');

var _wDoc2 = _interopRequireDefault(_wDoc);

require('dpt/lib/vendor/beast');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function frontMatter(str) {
    var regex = /^---$([\s\S]*?)---(\r?\n)*([\s\S]*)/m;
    var match = regex.exec(str);

    if (!match) {
        return {
            attributes: {},
            body: str
        };
    }

    return {
        attributes: _yamlJs2.default.load(match[1]),
        body: match[3]
    };
}

function slug(str) {
    return _lodash2.default.deburr(str.replace(/\s+/, '-').toLowerCase()).replace(/[^a-zа-я\-]/g, '');
}

_handlebars2.default.registerHelper('platform', function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return _lodash2.default.initial(args).includes(this.platform) ? _lodash2.default.last(args).fn(this) : '';
});

_handlebars2.default.registerHelper('platformNot', function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return !_lodash2.default.initial(args).includes(this.platform) ? _lodash2.default.last(args).fn(this) : '';
});

_handlebars2.default.registerHelper('example', function (opts) {
    opts.hash.lang = 'bml';
    return ':::example' + JSON.stringify(opts.hash) + '\n<example>' + opts.fn(this) + '</example>:::';
});

var DONT_PARSE_CHILDREN = {
    example: true
};

function customInline(remark) {
    function tokenizer(eat, value, silent) {
        var match = /^:(\w+)\[(.+?)\](\{.+?\})?/.exec(value);

        if (match) {
            if (silent) {
                return true;
            }

            return eat(match[0])(_extends({
                type: match[1],
                children: remark.parse(match[2]).children[0].children
            }, JSON.parse(match[3] || '{}')));
        }
    }

    function locator(value, fromIndex) {
        return value.indexOf(':', fromIndex);
    }

    tokenizer.locator = locator;

    var proto = remark.Parser.prototype;
    var methods = proto.inlineMethods;

    proto.inlineTokenizers.customInline = tokenizer;
    methods.splice(methods.indexOf('inlineText'), 0, 'customInline');
}

function customBlock(remark) {
    function tokenizer(eat, value, silent) {
        var match = /^:::(\w+)(\{[\s\S]*?\})?\n([\s\S]+?)\n?:::/.exec(value);

        if (match) {
            if (silent) {
                return true;
            }

            var node = _extends({
                type: match[1]
            }, JSON.parse(match[2] || '{}'));

            if (DONT_PARSE_CHILDREN[node.type]) {
                node.value = match[3];
            } else {
                node.children = remark.parse(match[3]).children;
            }

            return eat(match[0])(node);
        }
    }

    function locator(value, fromIndex) {
        return value.indexOf(':::', fromIndex);
    }

    tokenizer.locator = locator;

    var proto = remark.Parser.prototype;
    var methods = proto.blockMethods;

    proto.blockTokenizers.customBlock = tokenizer;
    methods.splice(methods.indexOf('fences'), 0, 'customBlock');
}

exports.default = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(opts, path) {
        var parser, platform, context, str, content, config, headings, doc;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        parser = _remark2.default.use(customInline).use(customBlock);
                        platform = opts.platform || 'desktop';
                        context = { platform: platform };
                        _context.next = 5;
                        return File.read(path);

                    case 5:
                        str = _context.sent;
                        content = parser.parse(_handlebars2.default.compile(str)(context));
                        config = {};

                        if (content.children && content.children[0] && content.children[0].type === 'yaml') {
                            config = _yamlJs2.default.load(content.children.shift().value);
                        }
                        headings = {};

                        (0, _unistUtilVisit2.default)(content, 'heading', function (node) {
                            node.text = '';
                            (0, _unistUtilVisit2.default)(node, 'text', function (text) {
                                return node.text += text.value;
                            });
                            var id = slug(node.text);
                            var i = 0;
                            while (headings[id] !== void 0 && headings[id] >= i) {
                                i++;
                            }
                            headings[id] = i;
                            node.id = i === 0 ? id : id + '-' + i;
                        });
                        ['code', 'example'].forEach(function (type) {
                            (0, _unistUtilVisit2.default)(content, type, function (node) {
                                if (!node.platform) {
                                    node.platform = platform;
                                }
                            });
                        });

                        doc = _react2.default.createElement(
                            'html',
                            null,
                            _react2.default.createElement(
                                'head',
                                null,
                                _react2.default.createElement(
                                    'title',
                                    null,
                                    '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F'
                                ),
                                _react2.default.createElement('script', { src: '/.core/babel-polyfill.js' }),
                                _react2.default.createElement('script', { src: '/.core/bundles/w-doc.js' }),
                                _react2.default.createElement('script', { src: '/.core/require.js' }),
                                _react2.default.createElement('script', { src: '/.core/loader.js' }),
                                _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: '\n                Loader.hideContentWhileLoading = false;\n                Loader.showProgressBar = false;\n                Loader.config(' + JSON.stringify(config) + ');\n                var _AST = ' + JSON.stringify(content) + ';\n                Loader.onLoad = function() {\n                    window.ReactDOM.render(React.createElement(Doc, {\n                        ast: _AST\n                    }), document.querySelector(\'.renderTarget\'));\n                };\n            ' } })
                            ),
                            _react2.default.createElement(
                                'body',
                                null,
                                _react2.default.createElement('div', { className: 'renderTarget', dangerouslySetInnerHTML: { __html: _server2.default.renderToString(_react2.default.createElement(_wDoc2.default, { ast: content }))
                                    } })
                            )
                        );
                        return _context.abrupt('return', {
                            body: _server2.default.renderToStaticMarkup(doc),
                            dependencies: [path],
                            mime: 'html'
                        });

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();