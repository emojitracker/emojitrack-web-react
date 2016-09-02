var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['whatwg-fetch', './src/app.js'],
    output: { path: './bin' , filename: 'bundle.js' },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }

}