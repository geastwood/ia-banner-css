'use strict';

/**
 * small formating going on here
 *
 * @return {Array} formated construct
 */
var organize = function(data) {
    var top, keys, temp;
    var formated = [];

    for (top in data) {
        if (data.hasOwnProperty(top)) {
            keys = Object.keys(data[top]);

            temp = keys.map(function(selector) {
                return {
                    selector: [top, selector],
                    config: data[top][selector].config || {},
                    style: data[top][selector].style || {}
                };
            });

            formated = formated.concat(temp);
        }
    }

    return formated;
};
var parse = function(source) {
    var data = JSON.parse(source);
    return organize(data);
};

module.exports = {
    parse: parse
};
