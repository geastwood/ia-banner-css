'use strict';
var fs = require('fs');
var baseUrl = __dirname;
// translate the css strings
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
var transStyle = function(data) {
    /*
    var border = templateConfigs.border;

    console.log(interpolate(border.template, border.defaults));
    */
    if (templateConfigs === null) {
        load();
    }

};

/**
 * receive output from parser
 * @return {Array} raw data for css builder to build
 */
var translate = function(data) {

    var cssRules = [];

    data.map(function(item) {
        console.log(transSelector(item));
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
