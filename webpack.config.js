var path = require('path');
var webpack = require('webpack');

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: ['whatwg-fetch', './src/app.js'],
    output: {
        path: './bin',
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: isProduction ? ['es2015', 'react'] : ['es2015', 'react', 'react-hmre']
            }
        }]
    }

}