/* eslint no-use-before-define: 0 no-sync: 0 */
const path = require('path');
const fs = require('fs-extra');
const through = require('through2');
const gulp = require('gulp');

const paths = require('../paths');
const environment = require('../environment');
const settings = require('../config/copyTwig');
const invalidateStatic = require('../invalidateStatic');

/**
 * Trim dependency path from possible directory prefix.
 * E.g. "components/foo/bar" -> "foo/bar"
 * @param  {string} depenencyPath Possibly prefixed dependency path.
 * @return {string}               Trimmed dependency path.
 */
function trimDependencyPath(depenencyPath) {
    return depenencyPath.replace(/^(customizations|components)\//, '');
}

const parsedFiles = {};
const parsedDepenedencies = {};

/**
 * Handles given dependency by copying it from pattern library if needed.
 * Dependency will be copied and parsed from recursive dependencies only if
 * it is not provided in main template /src/components directory.
 *
 * @param  {string} dependency Depenency name.
 * @return {undefined}
 */
function handleDependency(dependency) {
    const dependencyArray = dependency.split(/[\\/\\]/);
    const packageName = dependencyArray[0];
    const templateName = dependencyArray[dependencyArray.length - 1];
    const templateCPPath = path.join(
        settings.componentsPath,
        packageName,
        'src',
        templateName
    );
    const templateSourcePath = path.join(
        paths.src,
        'components',
        packageName,
        templateName
    );
    const templateDestPath = path.join(
        paths.dist,
        'components',
        packageName,
        templateName
    );

    if (fs.existsSync(templateSourcePath) === false) {
        try {
            fs.copySync(templateCPPath, templateDestPath);
            parseDepenedencies(templateCPPath);
        } catch (e) {
            // Do nothing.
        }
    }
}

/**
 * Parses give file for any dependencies using regular expression.
 * @param  {string} file Twig file to parse.
 * @return {undefined}
 */
function parseDepenedencies(file) {
    if (parsedFiles[file] === true) {
        return;
    }
    parsedFiles[file] = true;

    const fileContents = fs.readFileSync(file, 'utf8');
    const includePattern = /{%[^\(%}]*locate\(\s*['"]([^'"]+)['"]/gim;

    let dependencyMatch = includePattern.exec(fileContents);
    let dependency;
    while (dependencyMatch) {
        // For every found dependency.
        if (dependencyMatch[1]) {
            dependency = trimDependencyPath(dependencyMatch[1]);
            // Save dependency as parsed and handle it's copying and parsing process.
            if (!parsedDepenedencies[dependency]) {
                parsedDepenedencies[dependency] = true;
                handleDependency(dependency);
            }
        }
        dependencyMatch = includePattern.exec(fileContents);
    }
}

let firstRun = true;

module.exports = function copyTwig() {
    // If we are in watch mode, add watchers for this task.
    if (firstRun && environment.watch === true) {
        firstRun = false;
        gulp.watch(settings.watch, copyTwig);
    }

    return gulp
        .src(settings.src)
        .pipe(
            through.obj((file, enc, cb) => {
                parseDepenedencies(file.path);
                return cb(null, file);
            })
        )
        .pipe(gulp.dest(settings.dest));
};
