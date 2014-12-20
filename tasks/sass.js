var rubySass = require('gulp-ruby-sass');
var gulp = require('gulp');
var logError = require('./error-logger');

function getSassOpts(options) {
    if (options.dev) {
        return {
            sourcemapPath: options.sassSrc
        }
    } else {
        return {
            style: 'compressed'
        }
    }
}

module.exports = {
    build: function(options) {
        var sassOpts = getSassOpts(options);
        return gulp.src(options.sassSrc)
            .pipe(rubySass(sassOpts))
            .on('error', logError)
            .pipe(gulp.dest(options.dest));
    },

    watch: function(options) {
        return gulp.watch(options.sassSrc, this.build.bind(this, options));
    }
};
