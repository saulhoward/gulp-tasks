/**
 * Jekyll project
 *
 * Include this to get
 *
 *  - jekyll
 *  - browsersync
 *
 * with my default config (or pass overrides)
 */

var cp = require('child_process');
// var argv = require('yargs').argv;

var defaults = require('lodash-node').defaults;
var defaultConfig = {
    dest: './_site',
    dev: false,
    browserSync: {
        https: false,
        rewriteToRoot: false
    }
};

module.exports = function init(gulp, config) {
    // include base tasks
    require('./base')(gulp, defaults(config, defaultConfig));

    gulp.task('jekyll', function(done){
        var args = [
            'build',
            '--config',
            'src/_config.yml'
        ];

        // Include drafts optionally
        // var branch = argv.branch;
        // if (branch != 'master') {
        //     args.push('--drafts');
        // }

        return cp.spawn('./bin/jekyll', args, {stdio: 'inherit'})
        .on('close', done);
    });

    gulp.task('jekyll-watch', function(done){
        var args = [
            'build',
            '--config',
            'src/_config.yml',
            '--watch'
        ];
        return cp.spawn('./bin/jekyll', args, {stdio: 'inherit'})
        .on('close', done);
    });

    // override the base tasks
    gulp.task('start', ['jekyll-watch', 'server']);
    gulp.task('build', ['jekyll']);
};
