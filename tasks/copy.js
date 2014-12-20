var gulp = require('gulp');

module.exports = {
    build: function(options) {
        return gulp.src(options.copy.src, options.copy.base && {base: options.copy.base})
            .pipe(gulp.dest(options.dest));
    }
};
