(function () {
    "use strict";
    var module = angular.module("QMCUtilities", ["ngDialog", "btford.socket-io"])
        .factory('mySocket', function (socketFactory) {
            var myIoSocket = io.connect('https://localhost:9945', {secure: true, reconnect: true});

            var mySocket = socketFactory({
                ioSocket: myIoSocket
            });

            return mySocket;
        });

    function appMetaFetcherBodyController($scope, $http, ngDialog, mySocket) {

        mySocket.on("appMetaFetcher", function(msg) {
            model.statusOutput += msg +"\n";
        });

        var model = this;
        model.statusOutput = 'This is test output.';

        model.isTriggerButtonValid = function () {
            return true;
        }

        model.triggerMetaFetcher = function () {
            var blah = mySocket;
            mySocket.emit("appMetaFetcher", "blah blah blah");
            // validate path
            // send request to start
            // if response == already started, return failed
            // else print started
        };

        model.openHelp = function () {
            ngDialog.open({
                template: "plugins/appMetaFetcher/help-dialog.html",
                className: "help-dialog",
                controller: appMetaFetcherBodyController,
                scope: $scope
            });
        };
    }

    module.component("appMetaFetcherBody", {
        transclude: true,
        templateUrl: "plugins/appMetaFetcher/app-meta-fetcher-body.html",
        controllerAs: "model",
        controller: ["$scope", "$http", "ngDialog", "mySocket", appMetaFetcherBodyController]
    });

}());