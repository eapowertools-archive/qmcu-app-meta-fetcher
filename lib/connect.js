const qsocks = require('qsocks');
var config = require("../config/config");

module.exports = qsocks.Connect(config.qsocks);