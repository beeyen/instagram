/**
Multiple webpack configs, useful for both back and and front end
Create a base config and have others extend from it
**/

var gulp = require('gulp'),
    webpack = require('webpack'),
    path = require('path'),
    del = require('del'),
    DeepMerge = require('deep-merge'),
    nodemon = require('nodemon'),
    fs = require('fs');

var deepMerge = DeepMerge(function(target, source, key) {
    if (target instanceof Array) {
        return [].concat(target, source);
    }
    return source;
});

// function to resursively merging objects to override the default config
function config(overrides) {
    return deepMerge(defaultConfig, overrides || {});
}

// generic base webpack config to use the Babel loader and ES6 modules
var defaultConfig = {
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
    }
}
// THIS CAUSE BUILD ERRORS!!!!
// if (process.env.NODE_ENV !== 'production') {
//     defaultConfig.devtool = 'source-map';
//     defaultConfig.debug = true;
// }

// front-end webpack config, using the config function to merge
var frontendConfig = config({
    entry: './docs/js/main.js',
    output: {
      //path: path.join(__dirname, 'static/build'),
      path: './docs/build',
      filename: 'bundle.js'
     },
     plugins: [
         new webpack.BannerPlugin({
             banner: 'require("source-map-support").install();',
             raw: true,
             entryOnly: false })
     ],
     devtool: 'sourcemap'
 });

console.log(frontendConfig);

/** Backend Webpack Config **/
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


var backendConfig = config ({
    entry: './server.js',
    target: 'node',     // tells webpack not to touch any built-in modules like fs or path.
    output: {
      path: './build',
      filename: 'server.js'
    },
    externals: nodeModules, // not to bundle node_modules, A module listed as an external will simply be left alone
    plugins: [
      new webpack.IgnorePlugin(/\.(css|less)$/),
      new webpack.BannerPlugin({
          banner: 'require("source-map-support").install();',
          raw: true,
          entryOnly: false })
    ],
    devtool: 'sourcemap'
});
/** END OF backend webpack config **/

// TASKS

function onBuild(done) {
    return function(err, stats){
        if (err) {
            console.log('Error', err);
        } else {
            console.log(stats.toString());
        }
        if (done) {
            done();
        }
    }
}

gulp.task('cleanUpBackend', function() {
    return del('./build');
});

gulp.task('cleanUpFrontend', function() {
    return del('./docs/build');
});

gulp.task('frontend-build', ['cleanUpFrontend'], function(done){
    webpack(frontendConfig).run(onBuild(done));
});

gulp.task('frontend-watch', function() {
    webpack(frontendConfig).watch(100, onBuild());
})

gulp.task('backend-build', ['cleanUpBackend'], function(done) {
    webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', function() {
    webpack(backendConfig).watch(100, function(err, stats) {
        onBuild()(err, stats);
        nodemon.restart();
    });
});

gulp.task('build', ['frontend-build', 'backend-build']);

gulp.task('watch', ['frontend-watch', 'backend-watch']);

gulp.task('run', ['backend-watch', 'frontend-watch'], function() {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: './build/server',
        ignore: ['*'],
        watch: ['foo/'],
        ext: 'noop'
    }).on('restart', function() {
        console.log('Restarted!');
    })
})
