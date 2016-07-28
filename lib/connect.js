const qsocks = require('qsocks');
var configs = require("../config/config");

module.exports = qsocks.connect(config.qsocks);