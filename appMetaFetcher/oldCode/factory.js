var main = require('./main');
var qsocks = require('qsocks');
var serializeApp = require('serializeapp');
var config = require('./config/runtimeConfig');
var qrsInteract = require('qrs-interact');

var qrsConfig = {
    hostname: config.qsocks.host
}

var qrsInteractInstance = new qrsInteract(qrsConfig);

var main = new main(qsocks, serializeApp, qrsInteractInstance, config);