var main = require('./main');
var qsocks = require('qsocks');
var serializeApp = require('serializeapp');
var config = require('./config/runtimeConfig');
var qrsInteract = require('qrs-interact');

var qrsInteractInstance = new qrsInteract('localhost');

var main = new main(qsocks, serializeApp, qrsInteractInstance, config);