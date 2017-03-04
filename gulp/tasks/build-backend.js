/**
Single webpack config for backend
**/

var gulp = require('gulp'),
    webpack = require('webpack'),
    path = require('path'),
    del = require('del'),
    fs = require('fs');

/** BEGIN OF webpack.config.js **/
var nodeModules = {};
// We simply don't want to bundle in anything from node_modules.
// In Webpack: A module listed as an external will simply be left alone; it will not be bundled in
// Creating an object with a key/value of each module name, and prefixing the value with "commonjs".
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


var config = {
    entry: './src/server.js',
    target: 'node',     // tells webpack not to touch any built-in modules like fs or path.
    output: {
        path: './build',
        filename: 'server.js'
    },
    externals: nodeModules, // not to bundle node_modules, A module listed as an external will simply be left alone
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'], //all of the ES2015 features will be transformed into ES5 using the plugins specified
                    plugins: ['transform-runtime']
                }
            }
        ] // an array that holds the configuration for each loader used
    },
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false })
    ],
    devtool: 'sourcemap'
}
/** END OF webpack.config.js **/

gulp.task('delBuildFolder', function() {
    return del('./build');
});

gulp.task('build-backend', ['delBuildFolder'], function(done) {
    // pass a config to the webpack function and you get back a compiler
    webpack(config).run(function(err, stats){
        if (err) {
            console.log('Error', err);
        } else {
            console.log(stats.toString());
        }
        done();
    })
});
