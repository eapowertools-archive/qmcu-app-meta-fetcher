(function () {
    "use strict";
    var module = angular.module("QMCUtilities", ["ngDialog"])

    function appMetaFetcherBodyController($scope, $http, ngDialog) {
        var model = this;
      
    }

    module.component("appMetaFetcherBody", {
        transclude: true,
        templateUrl: "plugins/appMetaFetcher/app-meta-fetcher-body.html",
        controllerAs: "model",
        controller: ["$scope", "$http", "ngDialog", appMetaFetcherBodyController]
    });

}());