const path = require('path');

const paths = require('../../paths');

/**
 * Settings for SASS linting task.
 */
const settings = {
    src: [
        /**
         * Lint everything inside components and layouts directories.
         */
        path.join(paths.src, '**/*.{css,scss,sass}'),
        '!' + path.join(paths.src, 'vendors/**/*.{css,scss,sass}'),
        '!' + path.join(paths.src, 'utilities/_sprites.scss'),
    ],
    prettier: {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        tabWidth: 4,
        parser: 'scss',
    },
    dest: paths.src,
};

module.exports = settings;
