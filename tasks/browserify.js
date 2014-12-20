var browserify = require('browserify');
var watchify = require('watchify');

var reactify = require('reactify');
var envify = require('envify');

var stringify = require('stringify');

var logError = require('./error-logger');

var $ = require('gulp-load-plugins')();
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream2');
var gulp = require('gulp');

var defaults = require('lodash-node').defaults;

module.exports = {

    getBundler: function(opts) {
        opts = defaults(opts, {
            entries: './src/scripts/app.js'
        });

        if (opts.dev) {
            opts.debug = true;
            opts.useWatchify = true;
        }

        var bundler = browserify(opts);

        var transforms = [
            {
                opts: reactify,
                tr: { es6: true }
            },
            {
                opts: envify,
                tr: { NODE_ENV: 'development' }
            },
            {
                opts: stringify(['.html']),
                tr: null
            }
        ];

        // Apply transforms
        if (transforms.length > 0) {
            transforms.forEach(function(transform, index, arr) {
                var opts = transform.opts;
                var tr = transform.tr;
                bundler = bundler.transform(opts, tr);
            })
        }

        if (opts.useWatchify) {
            bundler = watchify(bundler);
            var reBundle = function() {
                return this.bundle(bundler, opts);
            }.bind(this);

            bundler.on('log', function(msg) { $.util.log(msg) });
            bundler.on('update', reBundle);
        }

        return bundler;
    },

    bundle: function(bundler, options) {
        bundler = bundler
            .bundle()
            .on('error', logError)
            .pipe(source(options.appFile));

        if (!options.dev) {
            bundler = bundler.pipe(uglify());
        }

        return bundler
            .pipe(gulp.dest(options.dest));
    }
};
