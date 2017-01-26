var bodyParser = require('body-parser');
var config = require('./config');
var express = require('express');
var fs = require('fs');
var promise = require('bluebird');
var qrsInteract = require('qrs-interact');
var socket = require('socket.io-client')('https://localhost:9945', {
    secure: true,
    reconnect: true
});

var parseUrlencoded = bodyParser.urlencoded({
    extended: false
});
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

var isRunning = false;

router.route('/fetch')
    .post(parseUrlencoded, function (request, response) {
        if (isRunning) {
            socket.emit("appMetaFetcher", "\nGMA export is already running, please wait for it to finish before triggering a new export.\n\n");
            response.sendStatus(403);
            return;
        }
        isRunning = true;
        var exportPath = request.body.exportPath;

        // check to make sure path is valid.



        socket.emit("appMetaFetcher", "Starting export of all metadata");
        setTimeout(function () {
            socket.emit("appMetaFetcher", "Done!");
            isRunning = false;
        }, 3000);
        response.sendStatus(202);
        return;
    });

module.exports = router;