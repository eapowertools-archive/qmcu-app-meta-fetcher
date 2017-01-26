(function () {
    "use strict";
    var module = angular.module("QMCUtilities", ["ngDialog", "btford.socket-io"])
        .factory('mySocket', function (socketFactory) {
            return socketFactory();
        });

    function appMetaFetcherBodyController($scope, $http, ngDialog, mySocket) {
        var model = this;
        model.statusOutput = '';

        mySocket.on("appMetaFetcher", function (msg) {
            model.statusOutput += msg + "\n";
        });

        model.isTriggerButtonValid = function () {
            return true;
        }

        model.triggerMetaFetcher = function () {
            $http.post('/appmetafetcher/fetch', {
                "exportPath": "somePath"
            });
            return;
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