var gulp = require('gulp');

module.exports = {
    build: function(options) {
        return gulp.src(options.htmlSrc)
            .pipe(gulp.dest(options.dest));
    }
};
