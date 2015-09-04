angular.module('gameApp')
    .directive('textWords', function () {
        return {
            restrict: "E",
            templateUrl: 'partials/text/index.html'
        };

    });