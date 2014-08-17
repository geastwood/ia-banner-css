'use strict';

/**
 * Parsing the data into arrays
 * Format input JSON into array fill with construct such as
 * {
 *      selects: [],
 *      config: {},
 *      style: {}
 *
 * }
 *
 * Only generate such construct when there is a selector (has properties other than `config` and `style`
 */

/**
 * small formating going on here
 *
 * @param {Object} data The raw JSON data
 * @return {Array} formated construct
 */
var organize = function(json) {
    var top, rst = [];
    function collect(name, data, parentName) {

        var keys = Object.keys(data);
        var selectorKeys = keys.filter(function(prop) {
            return ['config', 'style'].indexOf(prop) === -1;
        });

        var parentSelector;

        if (parentName) {
            parentName.push(name);
            parentSelector = parentName;
        } else {
            parentSelector = [name];
        }

        if (keys.indexOf('config') >= 0 && keys.indexOf('style') >= 0) {
            rst.push({
                selector: parentSelector,
                config: data.config || {},
                style: data.style || {}
            });
        }

        selectorKeys.forEach(function(childName) {
            collect(childName, data[childName], parentSelector.slice());
        });
    }

    for (top in json) {
        if (json.hasOwnProperty(top)) {
            collect(top, json[top]);
        }
    }

    return rst;
};

var parse = function(source) {
    var data = JSON.parse(source);
    return organize(data);
};

module.exports = {
    parse: parse
};
