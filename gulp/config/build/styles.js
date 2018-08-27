const path = require('path');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');

const paths = require('../../paths');

/**
 * Settings for styles compilation.
 */
const config = {
    watch: path.join(paths.src, '**/*.{css,scss,sass}'),
    src: path.join(paths.src, '**/*.{css,scss,sass}'),
    dest: path.join(paths.dist, 'web/'),
    postcss: [
        flexbugs(),
        autoprefixer({
            browsers: ['IE>=10', 'iOS>=8', '>1%', 'last 2 versions'],
        }),
    ],
    cleanCSS: {},
    sass: {
        precision: 10,
        errLogToConsole: true,
        includePaths: [
            path.resolve('src'),
            path.resolve('node_modules'),
            path.resolve('node_modules/theme-creativeshop/node_modules'),
        ],
    },
};

module.exports = config;
