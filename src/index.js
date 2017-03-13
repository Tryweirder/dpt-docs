import Path from 'path';

import express from 'express';
import serveIndex from 'serve-index';

import Libraries from './server/api/libraries';
import Blocks from './server/api/blocks';
import Snapshots from './server/api/snapshots';

import markdown from './compilers/markdown';

function main(app) {
    let router = express.Router();
    let libraries = Libraries(app);
    let blocks = Blocks(app);
    let snapshots = Snapshots(app);

    app.compilers.push({
        test: /\.md$/,
        use: markdown
    });

    router.get('/api/wiki/config', (req, res) => res.json(app.config));

    router.get('/api/wiki/libs/:lib/:block', blocks.show);
    router.get('/api/wiki/blocks/', blocks.index);
    router.post('/api/wiki/blocks/', blocks.create);

    router.get('/api/wiki/libs/:lib/', libraries.show);
    router.get('/api/wiki/libs/', libraries.index);
    router.post('/api/wiki/libs/', libraries.create);

    router.post('/api/wiki/libs/:library/:block/snapshot', snapshots.create);

    router.get('/', (req, res) => res.redirect('/wiki'));

    // Statics

    let fileMap = {
        '/wiki(/*)?': 'wiki/wiki.html',
        '/.core/bundles/w-doc.js': 'bundles/w-doc.js',
        '/.core/wiki.js': 'bundles/wiki.js'
    };

    for (let k in fileMap) {
        router.get(k, (req, res) => {
            res.sendFile(Path.join(__dirname, fileMap[k]));
        });
    }

    let indexCss = Path.resolve(__dirname, 'assets/wiki/serveIndex.css');

    router.use('/.core/assets', express.static(Path.join(__dirname, 'assets')));
    router.use('/projects', serveIndex('projects/', { 'stylesheet': indexCss }));

    app.server.use(router);
}

module.exports = main;
