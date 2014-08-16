'use strict';
var fs = require('fs');
var baseUrl = __dirname;

var parser = require('./parser');
var translator = require('./translator');
var dataFilePath = baseUrl + '/../data/data.json';
var css = require('./css.js');

fs.readFile(dataFilePath, 'utf8', function(err, data) {
    if (err) {
        throw err;
    }
    var parseData = parser.parse(data);
    var translatedData = translator.translate(parseData);
    var cssData = css.build(translatedData, function(selector) {
        return '.ia-[[IAPREFIX]]-' + selector;
    });
    css.write('banner.css', cssData, {});
});
