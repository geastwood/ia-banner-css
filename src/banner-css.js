'use strict';
var fs = require('fs');
var baseUrl = __dirname;

var parser = require('./parser');
var translator = require('./translator');

fs.readFile(baseUrl + '/../data/config.json', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }
    var parseData = parser.parse(data);
    var tranlatedData = translator.translate(parseData);
});
