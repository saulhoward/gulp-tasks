var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var defaults = require('lodash-node').defaults;

module.exports = function(options) {
    var middleware = [];
    if (options.browserSync.rewriteToRoot == true) {
        middleware.push(
            modRewrite(['!\\.\\w+$ /index.html [L]'])
        );
    }

    browserSync(defaults(options.browserSync || {}, {
            port: 9014,
            https: true,
            open: false,
            server: {
                baseDir: options.dest,
                index: 'index.html',
                middleware: middleware
            }
        }
    ));
};
