var main = require('./main');
var qsocks = require('qsocks');
var config = require('./config/runtimeConfig');

var main = new main(qsocks, config);