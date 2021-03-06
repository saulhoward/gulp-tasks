/**
 * Base tasks
 */
var del = require('del');
var runSequence = require('run-sequence');
var clone = require('lodash-node').clone;
var forEach = require('lodash-node').forEach;

var htmlTasks = require('../tasks/html');
var sassTasks = require('../tasks/sass');
var copyTasks = require('../tasks/copy');
var browserifyTasks = require('../tasks/browserify');
var browserSyncTask = require('../tasks/browser-sync');
var useminTask = require('../tasks/usemin');

module.exports = function init(gulp, config) {

    var userTasks = function() {
        if (config.tasks) {
            forEach(config.tasks, function(t) {
                t.call(null, gulp, config);
            });
        }
    };

    gulp.task('user-tasks', function() {
        userTasks();
    });

    gulp.task('build-app', function() {
        var bundler = browserifyTasks.getBundler(config);
        return browserifyTasks.bundle(bundler, config);
    });

    gulp.task('build-sass', function() {
        return sassTasks.build(config);
    });

    gulp.task('build-html', function() {
        return htmlTasks.build(config);
    });

    gulp.task('build-conf', function() {
        return copyTasks.build(config);
    });

    gulp.task('build-all', [
        'build-app',
        'build-html',
        'build-sass',
        'build-conf'
    ]);

    gulp.task('build-all-except-app', [
        'build-html',
        'build-sass',
        'build-conf'
    ]);

    gulp.task('watch-app', function() {
        var browserifyConfig = clone(config);
        browserifyConfig.dev = true;
        var bundler = browserifyTasks.getBundler(browserifyConfig);
        return browserifyTasks.bundle(bundler, config);
    });

    gulp.task('watch-sass', function() {
        return sassTasks.watch(config);
    });

    gulp.task('use-min', function() {
        return useminTask(config);
    });

    gulp.task('watch', function(callback) {
        runsequence = runSequence.use(gulp);
        runsequence(
            'build-all-except-app',
            ['user-tasks', 'watch-app', 'watch-sass'],
            function() {
                userTasks();
            }
        );
    });

    gulp.task('server', function() {
        return browserSyncTask(config);
    });

    gulp.task('start', ['server', 'watch']);

    gulp.task('build', function() {
        runsequence = runSequence.use(gulp);
        runsequence(
            'build-all',
            'use-min',
            function() {
                userTasks();
            }
        );
    });

    gulp.task('clean', function() {
        del([
            config.dest
        ]);
    });
};
