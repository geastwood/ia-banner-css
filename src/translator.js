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
 * Here is an overview how data looks like
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
 * @return {Array} declaration block as array
 */
var getDeclarationBlock = function(data) {
    var rst = [], styles = data.style;

    for (var style in styles) {
        if (styles.hasOwnProperty(style)) {
            rst = rst.concat(buildStyle(style, styles[style]));
        }
    }

    return rst;
};

/**
 * build individual css line base on template config
 * @param {String} name Name of the style to be built, e.g. border, background, linear-gradient
 * @param {Object} data Object contains defaults and template for building individual style line
 *
 * @return {Array} result for individual style, in case of linear-gradient array.length > 1, otherwise array.length = 1
 *                 the return array basically match the `template` property defined in `template.config' file
 */
var buildStyle = function(name, data) {
    var template, templateData, rst = [];

    if (templateConfigs === null) {
        load();
    }

    if (!templateConfigs[name]) {
        throw "Error when loading template data: '" + name + "'\n" +
            "Please check any style property defined with '" + name + "'";
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

    var cssRules = data.map(function(item) {
        return {
            selector: transSelector(item),
            declearations: getDeclarationBlock(item)
        };
    });

    console.log(cssRules);
    return cssRules;
};

module.exports = {
    translate: translate
};
