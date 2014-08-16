'use strict';
var util = require('./util');
var fs = require('fs');

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

// write to file
var write = function(filename, data, opts) {
    var css = [];
    css = data.map(function(rule) {
        return rule.selector + " " + rule.open + "\n" +
            rule.declaration.map(function(line) {
                return util.pad(line, 1);
            }).join("\n") + "\n" + rule.close;
    }).join("\n");

    fs.writeFile(filename, css, function(err) {
        if (err) {
            throw err;
        }
        console.log('data have been written into ' + filename);
    });
};
module.exports = {
    build: build,
    write: write
};
