'use strict';
/**
 * build css blocks
 * @return {Array} collection of css building blocks
 */
var build = function(data, fn) {
    return data.map(function(css) {
        return {
            selector: (typeof fn === 'function') ? fn(css.selector) : css.selector,
            open: '{',
            declaration: css.declaration,
            close: '}'
        };
    });
};
var write = function() {
    // write to file
};
module.exports = {
    build: build,
    write: write
};
