var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var defaults = require('lodash-node').defaults;

module.exports = function(options) {
    browserSync(defaults(options.browserSync || {}, {
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
        }
    ));
};
