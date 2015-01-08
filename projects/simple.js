/**
 * Simple project
 *
 * Include this to get
 *
 *  - browserify
 *  - browser sync
 *  - sass
 *  - build with usemin
 *
 * with my default config (or pass overrides)
 */

var defaults = require('lodash-node').defaults;
var defaultConfig = {
    dest: './_site',
    appFile: 'app.js',
    dev: false,
    sassSrc: './src/styles/**/*.scss',
    htmlSrc: './src/index.html',
    copy: {
        base: './src/',
        src: [
            './src/config.json',
            './src/config.js',
            './src/manifest.webapp',
            './src/img/**'
        ]
    },
    browserSync: {
        https: true
    }
};

module.exports = function init(gulp, config) {
    // include base tasks
    require('./base')(gulp, defaults(config, defaultConfig));
};
