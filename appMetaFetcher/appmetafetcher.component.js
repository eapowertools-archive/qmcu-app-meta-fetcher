(function () {
    "use strict";
    var module = angular.module("QMCUtilities", ["ngDialog"])

    function appMetaFetcherBodyController($scope, $http, ngDialog) {
        var model = this;
        model.statusOutput = 'This is test output.';

        model.triggerMetaFetcher = function (){
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
        controller: ["$scope", "$http", "ngDialog", appMetaFetcherBodyController]
    });

}());