const path = require('path');

const paths = require('../../paths');

/**
 * Returns configuration for copying miscellaneous files that don't need any processing.
 */
module.exports = {
    watch: [
        // JSON except data for templates.
        path.join(paths.src, '**/*.json'),
        // PHP files
        path.join(paths.src, '**/*.{php,phtml}'),
        // XML files
        path.join(paths.src, '**/*.xml'),
        // CSV files
        path.join(paths.src, '**/*.csv'),
        // Require.js configs.
        path.join(paths.src, '**/requirejs-config.js'),
        // Less and CSS styles.
        path.join(paths.src, '**/*.{less,css}'),
        // Theme web images
        path.join(paths.src, '**/*.{gif,png,jpg,jpeg,webp,svg,ico}'),
        '!' + path.join(paths.src, 'sprites/**/*'),
        // Video media files
        path.join(paths.src, '**/*.{webm,mp4,ogg}'),
    ],

    src: [
        // JSON.
        path.join(paths.src, '**/*.json'),
        // PHP files
        path.join(paths.src, '**/*.{php,phtml}'),
        // XML files
        path.join(paths.src, '**/*.xml'),
        // CSV files
        path.join(paths.src, '**/*.csv'),
        // Require.js configs.
        path.join(paths.src, '**/requirejs-config.js'),
        // Less styles.
        path.join(paths.src, '**/*.{less,css}'),
        // Theme web images
        path.join(paths.src, '**/*.{gif,png,jpg,jpeg,webp,svg,ico}'),
        '!' + path.join(paths.src, 'sprites/**/*'),
        // Video media files
        path.join(paths.src, '**/*.{webm,mp4,ogg}'),
    ],
    dest: paths.dist,
};
