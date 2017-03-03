'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

var _libraries = require('./server/api/libraries');

var _libraries2 = _interopRequireDefault(_libraries);

var _blocks = require('./server/api/blocks');

var _blocks2 = _interopRequireDefault(_blocks);

var _markdown = require('./compilers/markdown');

var _markdown2 = _interopRequireDefault(_markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main(app) {
    var router = _express2.default.Router();
    var libraries = (0, _libraries2.default)(app);
    var blocks = (0, _blocks2.default)(app);

    app.compilers.push({
        test: /\.md$/,
        compiler: _markdown2.default
    });

    router.get('/api/wiki/config', function (req, res) {
        return res.json(app.config);
    });

    router.get('/api/wiki/libs/:lib/:block', blocks.show);
    router.get('/api/wiki/blocks/', blocks.index);
    router.post('/api/wiki/blocks/', blocks.create);

    router.get('/api/wiki/libs/:lib/', libraries.show);
    router.get('/api/wiki/libs/', libraries.index);
    router.post('/api/wiki/libs/', libraries.create);

    router.get('/', function (req, res) {
        return res.redirect('/wiki');
    });

    // Statics

    var fileMap = {
        '/wiki(/*)?': 'wiki/wiki.html',
        '/.core/bundles/w-doc.js': 'bundles/w-doc.js',
        '/.core/wiki.js': 'bundles/wiki.js'
    };

    var _loop = function _loop(k) {
        router.get(k, function (req, res) {
            res.sendFile(_path2.default.join(__dirname, fileMap[k]));
        });
    };

    for (var k in fileMap) {
        _loop(k);
    }

    var indexCss = _path2.default.join(__dirname, '../assets/wiki/serveIndex.css');

    router.use('/.core/assets', _express2.default.static(_path2.default.join(__dirname, 'assets')));
    router.use('/projects', (0, _serveIndex2.default)('projects/', { 'stylesheet': indexCss }));

    app.server.use(router);
}

module.exports = main;