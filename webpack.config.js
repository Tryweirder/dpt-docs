var webpack = require('webpack');

var env = new webpack.DefinePlugin({
    'process.env': {
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
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader?singleton!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader?singleton!css-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader?stripdeclarations'
            }
        ]
    },
    plugins: [env]
};
