import Path from 'path';

import Promise from 'bluebird';
import _ from 'lodash';

export default function Blocks({ Block, Library, logger }) {
    return {
        async create(req, res) {
            let library = new Library(req.body.library);
            let block = new Block(library, req.body.block);

            try {
                let result = await block.snapshot();

                res.json({
                    result: 'Success',
                    library: library.name,
                    block: block.name,
                    archived: result.archived ? result.archived.toString() : null,
                    stable: result.stable
                });
            } catch (e) {
                logger.error(e);
                res.status(500).json({
                    error: e.message
                });
            }
        }
    };
}
