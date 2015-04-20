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
        otherwise({
            redirectTo: '/game1'
        });
}]);
