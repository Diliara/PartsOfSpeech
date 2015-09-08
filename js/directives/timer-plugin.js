angular.module('gameApp')
    .directive('timerPlugin', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).countDown(scope.$eval(attrs.timerPlugin));
            }
        };
    });