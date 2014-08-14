'use strict';
var fs = require('fs');
var parser = (function() {

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
        //console.log(organize(data));
        return organize(data);
    };

    return {
        parse: parse
    };
}());

// translate the css strings
var translator = (function() {
    var templateConfigs = null;

    var interpolate = function(template, config) {
        return template.replace(/{([\w]+)}/gm, function(a, b) {
            return config[b];
        });
    };

    // TODO may come from a different place
    var load = function() {
        var template = JSON.parse(fs.readFileSync('template.json', 'utf8'));
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
            console.log(buildSelector(item));
            return {
                selector: transSelector(item),
                declearations: transStyle(item)
            };
        });

        return cssRules;
    };

    return {
        translate: translate
    };
}());

var css = (function() {

    /**
     * build css blocks
     * @return {Array} collection of css building blocks
     */
    var build = function(data) {

    };
    return {
        build: build
    };
}());

var writer = (function() {
    var write = function(data) {
        // write what translator returned
    };
    return {
        write: write
    };
}());

fs.readFile('config.json', 'utf8', function(err, data) {
    var parseData = parser.parse(data);
    var tranlatedData = translator.translate(parseData);
});
