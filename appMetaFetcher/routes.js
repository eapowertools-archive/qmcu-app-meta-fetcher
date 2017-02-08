var bodyParser = require('body-parser');
var config = require('./config/runtimeConfig');
var express = require('express');
var fs = require('fs');
fs.access = fs.access || require('path').access;
var promise = require('bluebird');
var qsocks = require('qsocks');
var serializeApp = require('serializeapp');
var qrsInteract = require('qrs-interact');
var fetcherMain = require('./main');
var socket = require('socket.io-client')('https://localhost:9945', {
    secure: true,
    reconnect: true
});

var qrsConfig = {
    hostname: config.qsocks.host,
    localCertPath: config.certificates.certPath
}
var qrsInteractInstance = new qrsInteract(qrsConfig);

var parseUrlencoded = bodyParser.urlencoded({
    extended: false
});
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

var isRunning = false;


function canWrite(owner, inGroup, mode) {
    return owner && (mode & 00200) || // User is owner and owner can write.
        inGroup && (mode & 00020) || // User is in group and group can write.
        (mode & 00002); // Anyone can write.

}

router.route('/fetch')
    .post(parseUrlencoded, function (request, response) {
        if (isRunning) {
            socket.emit("appMetaFetcher", "\nGMA export is already running, please wait for it to finish before triggering a new export.\n\n");
            response.sendStatus(403);
            return;
        }
        isRunning = true;
        var exportPath = request.body.exportPath;

        fs.exists(exportPath, function (success) {
            if (!success) {
                socket.emit("appMetaFetcher", "\nThe path '" + exportPath + "' does not exist or you do not" +
                    " have access to write to this location.\n");
                response.sendStatus(400);
                isRunning = false;
            } else {
                try {
                    socket.emit("appMetaFetcher", "Starting export of all metadata");
                    // do all the things
                    config['filenames']['outputDir'] = exportPath + '/';
                    var main = new fetcherMain(qsocks, serializeApp, qrsInteractInstance, config, socket);
                    main.then(function () {
                        socket.emit("appMetaFetcher", "Export done, files can be found in: '" + exportPath + "'.\n");
                        isRunning = false;
                    })
                    response.sendStatus(202);
                } catch (err) {
                    if (err.code = "EPERM") {
                        socket.emit("appMetaFetcher", "\nYou do not have permission to write to: " + exportPath);
                        socket.emit("appMetaFetcher", "\t" + err + "\n");
                    } else {
                        socket.emit("appMetaFetcher", "An error occurred: " + err + "\n");
                    }
                    socket.emit("appMetaFetcher", "Export not completed.\n");
                    isRunning = false;
                };
            }
            return;
        });
    });

module.exports = router;