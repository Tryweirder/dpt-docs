import Path from 'path';

export default function Libraries({ Block, Library }) {
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
            let libraries = await Library.all().map(async library => {
                let name = library.name;
                let config = await library.readConfig().catch(() => ({}));

                return { name, ...config };
            });
            res.json(libraries);
        },

        async create(req, res) {
            try {
                let result = await Library.scaffold(req.body);
                res.json(result);
            } catch (err) {
                res.json({
                    error: {
                        message: err.message
                    }
                });
            }
        },

        async show(req, res) {
            let library = new Library(req.params.lib);
            let config = await library.readConfig().catch(() => ({}));
            let blocks = await library.blocks().map(b => blockInfo(b));

            res.json({
                name: library.name,
                blocks,
                ...config
            });
        }
    };
}