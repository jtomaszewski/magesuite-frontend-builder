const path = require('path');
const paths = require('../../paths');

/**
 * Configuration for vendor JS files merging task.
 */
module.exports = {
    watch: [path.join(paths.src, 'vendors/**/_*.js')],
    src: [path.join(paths.src, 'vendors/**/_*.js')],
    // Uglify settings.
    // @see https://www.npmjs.com/package/gulp-uglify#options
    uglify: {},
    dest: path.join(paths.dist, 'web/'),
    filename: 'vendors.js',
};
