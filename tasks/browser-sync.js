var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');

module.exports = function(options) {
    browserSync({
        port: 9014,
        https: true,
        open: false,
        server: {
            baseDir: options.dest,
            index: 'index.html',
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
};
