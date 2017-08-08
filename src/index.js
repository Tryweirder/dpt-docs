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

    router.get('/api/docs/config', (req, res) => res.json(app.config));

    router.get('/api/docs/libs/:lib/:block', blocks.show);
    router.get('/api/docs/blocks/', blocks.index);
    router.post('/api/docs/blocks/', blocks.create);

    router.get('/api/docs/libs/:lib/', libraries.show);
    router.get('/api/docs/libs/', libraries.index);
    router.post('/api/docs/libs/', libraries.create);

    router.post('/api/docs/libs/:library/:block/snapshot', snapshots.create);

    router.get('/', (req, res) => res.redirect('/docs'));

    // Statics

    let fileMap = {
        '/docs(/*)?': 'wiki/docs.html',
        '/.core/bundles/w-doc.js': 'bundles/w-doc.js',
        '/.core/wiki.js': 'bundles/wiki.js'
    };

    for (let k in fileMap) {
        router.get(k, (req, res) => {
            res.sendFile(Path.join(__dirname, fileMap[k]));
        });
    }

    let indexCss = Path.resolve(__dirname, 'assets/docs/serveIndex.css');

    router.use('/.core/assets', express.static(Path.join(__dirname, 'assets')));
    router.use('/projects', serveIndex('projects/', { 'stylesheet': indexCss }));

    app.server.use(router);
}

module.exports = main;
