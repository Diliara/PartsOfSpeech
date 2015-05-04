var gameApp = angular.module('gameApp', ['ngRoute', 'gameControllers']);

gameApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/game1', {
            templateUrl: 'partials/game1.html'
        }).
        when('/game1_practice', {
            templateUrl: 'partials/game1_practice.html',
            controller: 'Game1PracticeController'
        }).
        when('/home', {
            redirectTo: '/game1'
        }).
        when('/game1_challenge', {
            templateUrl: 'partials/game1_challenge.html',
            controller: 'Game1ChallengeController'
        }).
        otherwise({
            redirectTo: '/game1'
        });
}]);


gameApp.directive('timerPlugin', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).countDown(scope.$eval(attrs.timerPlugin));
        }
    };
});
