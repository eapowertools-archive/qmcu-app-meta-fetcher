(function () {
    "use strict";
    var module = angular.module("QMCUtilities", ["ngDialog", "btford.socket-io"])
        .factory('mySocket', function (socketFactory) {
            return socketFactory();
        });

    function appMetaFetcherBodyController($scope, $http, ngDialog, mySocket) {
        var model = this;
        model.statusOutput = '';
        model.exportPath = 'C:\\Program Files\\Qlik\\Sense\\EAPowerTools\\GMAOutput';

        mySocket.on("appMetaFetcher", function (msg) {
            model.statusOutput += msg + "\n";
        });

        model.isTriggerButtonValid = function () {
            return true;
        }

        model.triggerMetaFetcher = function () {
            $http.post('/appmetafetcher/fetch', {
                "exportPath": model.exportPath
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