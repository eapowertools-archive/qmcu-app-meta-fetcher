var server = require('./server');
var qsocks = require('qsocks');
var config = require('./config/certificatesConfig');

var main = new server(qsocks, config);