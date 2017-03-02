var webpack = require('webpack');

var env = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        'BROWSER': JSON.stringify(true)
    }
});

module.exports = {
    entry: {
        wiki: './src/wiki/router.js',
        'w-doc': './src/wiki/components/js/w-doc.js'
    },
    output: {
        path: __dirname + "/build/bundles/",
        filename: "[name].js"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: 'style?singleton!css!autoprefixer!less'
            }
        ]
    },
    plugins: [env]
};