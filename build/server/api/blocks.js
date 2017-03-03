'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Blocks;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function Blocks(_ref) {
    var blockInfo = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(block) {
            var versions, current, config;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return block.versions().map(function (v) {
                                return v.toString();
                            });

                        case 2:
                            versions = _context.sent;
                            _context.next = 5;
                            return block.latestUsableVersion();

                        case 5:
                            current = _context.sent;
                            _context.next = 8;
                            return block.readConfig().catch(function () {
                                return {};
                            });

                        case 8:
                            config = _context.sent;
                            return _context.abrupt('return', _extends({
                                id: block.library.name + '.' + block.name,
                                name: block.name,
                                library: block.library.name,
                                current: current.toString(),
                                path: '/' + _path2.default.relative(process.cwd(), block.path()),
                                platforms: {},
                                versions: versions
                            }, config));

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function blockInfo(_x) {
            return _ref2.apply(this, arguments);
        };
    }();

    var Block = _ref.Block,
        Library = _ref.Library,
        logger = _ref.logger;


    return {
        index: function index(req, res) {
            var _this = this;

            return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var libraries, blocks, result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return Library.all();

                            case 3:
                                libraries = _context2.sent;
                                _context2.t0 = _lodash2.default;
                                _context2.next = 7;
                                return _bluebird2.default.map(libraries, function (l) {
                                    return l.blocks();
                                });

                            case 7:
                                _context2.t1 = _context2.sent;
                                blocks = _context2.t0.flatten.call(_context2.t0, _context2.t1);
                                _context2.next = 11;
                                return blocks.map(function (b) {
                                    return {
                                        name: b.name,
                                        library: b.library.name,
                                        id: b.library.name + '/' + b.name
                                    };
                                });

                            case 11:
                                result = _context2.sent;

                                res.json(result);
                                _context2.next = 19;
                                break;

                            case 15:
                                _context2.prev = 15;
                                _context2.t2 = _context2['catch'](0);

                                logger.error(_context2.t2);
                                res.json(_context2.t2);

                            case 19:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 15]]);
            }))();
        },
        create: function create(req, res) {
            var _this2 = this;

            return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                var result;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return Block.scaffold(req.body);

                            case 3:
                                result = _context3.sent;

                                res.json(result);
                                _context3.next = 10;
                                break;

                            case 7:
                                _context3.prev = 7;
                                _context3.t0 = _context3['catch'](0);

                                res.json({
                                    error: {
                                        message: _context3.t0.message
                                    }
                                });

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this2, [[0, 7]]);
            }))();
        },
        show: function show(req, res) {
            var library = new Library(req.params.lib);
            var block = new Block(library, req.params.block);

            blockInfo(block).then(function (i) {
                return res.json(i);
            });
        }
    };
}