var bodyParser = require('body-parser');
var config = require('./config');
var express = require('express');
var fs = require('fs');
var promise = require('bluebird');
var qrsInteract = require('qrs-interact');

var parseUrlencoded = bodyParser.urlencoded({
    extended: false
});
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));



module.exports = router;