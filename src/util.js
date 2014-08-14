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
module.exports = {
    extend: extend
};
