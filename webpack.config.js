var webpack = require('webpack');

var env = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        'BROWSER': JSON.stringify(true)
    }
});

module.exports = {
    entry: {
        wiki: './src/wiki/router.jsx',
        'w-doc': './src/wiki/blocks/WDoc/WDoc.jsx'
    },
    output: {
        path: __dirname + "/build/bundles/",
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
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
