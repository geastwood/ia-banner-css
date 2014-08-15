'use strict';
var extend = function(target, source) {
    for (var prop in target) {
        if (target.hasOwnProperty(prop)) {
            if (typeof source[prop] !== 'undefined') {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

/**
 * Padding using space
 */
var pad = function(str, indent) {
    /* jshint newcap: false */
    var padding = (indent) ? Array(indent * 4).join(' ') : '';
    return padding + str;
};
module.exports = {
    extend: extend,
    pad: pad
};
