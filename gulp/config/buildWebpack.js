const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const jsonImporter = require('node-sass-json-importer');

const environment = require('../environment');
const paths = require('../paths');
const parentAliases = require('../parentAliases')();
const collectEntries = require('../collectEntries');

/**
 * Returns information for scripts building.
 */
const settings = {
    webpack: {
        entry: collectEntries(path.join(paths.src, 'entries/*.ts')),
        output: {
            filename: 'js/[name].js',
            path: path.join(paths.dist, 'web'),
            library: 'bundle',
            libraryTarget: 'umd',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: environment.development,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: environment.development,
                                plugins: [
                                    require('postcss-flexbugs-fixes')(),
                                    require('autoprefixer')(),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: environment.development,
                                includePaths: [
                                    paths.src,
                                    'node_modules',
                                    ...Object.values(parentAliases),
                                ],
                                importer: jsonImporter(),
                            },
                        },
                    ],
                },
                {
                    test: /\.vue$/,
                    use: 'vue-loader',
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'css/[name].css',
                chunkFilename: '[id].css',
            }),
            new VueLoaderPlugin(),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
            alias: parentAliases,
            modules: [
                paths.src,
                'node_modules',
                ...Object.values(parentAliases),
            ],
        },
        externals: {
            jquery: 'jquery',
        },
        devtool: environment.development ? 'inline-source-map' : false,
        mode: environment.development ? 'development' : 'production',
        watch: environment.watch,
    },
};

module.exports = settings;
