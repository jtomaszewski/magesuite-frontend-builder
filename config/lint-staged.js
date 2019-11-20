module.exports = {
    'src/**/*.{css,scss}': ['stylelint --fix', 'git add'],
    'src/**/*.{ts,js}': ['prettier --write', 'tslint --fix', 'git add'],
};
