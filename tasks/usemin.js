var gulp    = require('gulp');
var rev     = require('gulp-rev');
var fs      = require('fs');
var usemin = require('gulp-usemin');
var through = require('through2');
var gutil   = require('gulp-util');
var log     = gutil.log;
var colors  = gutil.colors;

/**
 * Copied from {@link https://github.com/sindresorhus/gulp-rev/issues/50}
 * @returns {*}
 */
function removeOriginals(dest) {
    return through.obj(function(file, enc, cb) {
        if (file.revOrigPath) {
            var path = dest + '/' + file.revOrigPath;

            log(colors.red('DELETING'), path);
            fs.unlink(path, function(err) {
                // TODO: emit an error if err
                //console.log("Error occurred removing original file after cache busting: ", err);
                cb();
            });
        }
        this.push(file); // We'll just pass this file along
    });
}

module.exports = function(config) {
    return gulp.src(config.htmlSrc)
        .pipe(usemin({
            css: [rev()],
            js: [rev()]
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(removeOriginals(config.dest));
}
