import Path from 'path';

import Promise from 'bluebird';
import _ from 'lodash';

export default function Blocks({ Block, Library, logger }) {
    async function blockInfo(block) {
        let versions = await block.versions().map(v => v.toString());
        let current = await block.latestUsableVersion();

        let config = await block.readConfig().catch(() => ({}));

        return {
            id: block.library.name + '.' + block.name,
            name: block.name,
            library: block.library.name,
            current: current.toString(),
            path: '/' + Path.relative(process.cwd(), block.path()),
            platforms: {},
            versions,
            ...config
        };
    }

    return {
        async index(req, res) {
            try {
                let libraries = await Library.all();
                let blocks = _.flatten(await Promise.map(libraries, l => l.blocks()));
                let result = await blocks.map(b => ({
                    name: b.name,
                    library: b.library.name,
                    id: b.library.name + '/' + b.name
                }));
                res.json(result);
            } catch (e) {
                logger.error(e);
                res.json(e);
            }
        },

        async create(req, res) {
            try {
                let result = await Block.scaffold(req.body);
                res.json(result);
            } catch (err) {
                res.json({
                    error: {
                        message: err.message
                    }
                });
            }
        },

        show(req, res) {
            let library = new Library(req.params.lib);
            let block = new Block(library, req.params.block);

            blockInfo(block).then(i => res.json(i));
        }
    };
}