var path = require('path');
var webpack = require('webpack');

const isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
    // using some tips from here: http://jonnyreeves.co.uk/2016/simple-webpack-prod-and-dev-config/
    // but modified... (e.g. wtf why not just use EnvironmentPlugin?)
    var plugins = [];

    // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    plugins.push(
        new webpack.EnvironmentPlugin(["NODE_ENV"])
    );

    
    // Conditionally add plugins for Production builds.
    if (isProd) {
        plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({ 
                compress: { warnings: false }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.DedupePlugin()
        );
    }

    // Conditionally add plugins for Development
    else {
        // ...
    }

    return plugins;
}

module.exports = {
    entry: ['whatwg-fetch', './src/app.js'],
    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    
    plugins: getPlugins(),
    
    module: {
        loaders: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: isProd ? ['es2015', 'react'] : ['es2015', 'react', 'react-hmre']
            }
        }]
    }

}