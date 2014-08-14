'use strict';
var fs = require('fs');
var util = require('./util');
var baseUrl = __dirname;

var templateConfigs = null;

var interpolate = function(template, config) {
    return template.replace(/{([\w]+)}/gm, function(a, b) {
        return config[b];
    });
};

// TODO may come from a different place
var load = function() {
    var template = JSON.parse(fs.readFileSync(baseUrl + '/../config/template.json', 'utf8'));
    templateConfigs = template;
};

var transSelector = function(data) { // TODO may need refactoring
    var parent = data.selector[0];
    return data.config.cssCls.replace(/^&/, parent);
};

/**
 * Here is an overview how data look like
 * {
 *   selector: [],
 *   style: {
 *      border: {
 *          config: {},
 *          template: '' | []
 *      }
 *   }
 * }
 *
 * @param {Object} data Object defines one css block
 */
var transStyle = function(data) {
    var rst = [];
    for (var style in data.style) {
        if (data.style.hasOwnProperty(style)) {
            rst = rst.concat(buildStyle(style, data.style[style]));
        }
    }

    console.log(rst);
    return rst;
};
var buildStyle = function(name, data) {
    var template, templateData, rst = [];

    if (templateConfigs === null) {
        load();
    }

    template = templateConfigs[name].template;
    // here merge the data with `defaults`
    templateData = util.extend(templateConfigs[name].defaults, data);

    if (typeof template === 'string') {
        rst.push(interpolate(template, templateData));
    } else { // handles multiple lines definition like gradient
        template.forEach(function(line) {
            rst.push(interpolate(line, templateData));
        });
    }

    return rst;
};

/**
 * receive output from parser
 * @return {Array} raw data for css builder to build
 */
var translate = function(data) {

    var cssRules = [];

    data.map(function(item) {
        return {
            selector: transSelector(item),
            declearations: transStyle(item)
        };
    });

    return cssRules;
};

module.exports = {
    translate: translate
};
