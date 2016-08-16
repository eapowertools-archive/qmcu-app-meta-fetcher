var main = require('./main');
var qsocks = require('qsocks');
var serializeApp = require('serializeapp');
var config = require('./config/runtimeConfig');

var main = new main(qsocks, serializeApp, config);