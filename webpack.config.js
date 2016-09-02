var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['whatwg-fetch', './src/app.js'],
    output: {
        path: './bin',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                // TODO: need to make this sensitive to environment so its not bundled for prod
                presets: ['es2015', 'react', 'react-hmre']
            }
        }]
    }

}