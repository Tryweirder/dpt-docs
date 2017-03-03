'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Libraries;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function Libraries(_ref) {
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
        Library = _ref.Library;


    return {
        index: function index(req, res) {
            var _this = this;

            return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                var libraries;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return Library.all().map(function () {
                                    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(library) {
                                        var name, config;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        name = library.name;
                                                        _context2.next = 3;
                                                        return library.readConfig().catch(function () {
                                                            return {};
                                                        });

                                                    case 3:
                                                        config = _context2.sent;
                                                        return _context2.abrupt('return', _extends({ name: name }, config));

                                                    case 5:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x2) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());

                            case 2:
                                libraries = _context3.sent;

                                res.json(libraries);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this);
            }))();
        },
        create: function create(req, res) {
            var _this2 = this;

            return _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                var result;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return Library.scaffold(req.body);

                            case 3:
                                result = _context4.sent;

                                res.json(result);
                                _context4.next = 10;
                                break;

                            case 7:
                                _context4.prev = 7;
                                _context4.t0 = _context4['catch'](0);

                                res.json({
                                    error: {
                                        message: _context4.t0.message
                                    }
                                });

                            case 10:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this2, [[0, 7]]);
            }))();
        },
        show: function show(req, res) {
            var _this3 = this;

            return _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                var library, config, blocks;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                library = new Library(req.params.lib);
                                _context5.next = 3;
                                return library.readConfig().catch(function () {
                                    return {};
                                });

                            case 3:
                                config = _context5.sent;
                                _context5.next = 6;
                                return library.blocks().map(function (b) {
                                    return blockInfo(b);
                                });

                            case 6:
                                blocks = _context5.sent;


                                res.json(_extends({
                                    name: library.name,
                                    blocks: blocks
                                }, config));

                            case 8:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this3);
            }))();
        }
    };
}