angular.module('gameApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game1', {
            templateUrl: 'partials/game1/index.html'
        })
            .when('/game1/practice', {
                templateUrl: 'partials/game1/practice/index.html',
                controller: 'Game1PracticeController'
            })
            .when('/game1/challenge', {
                templateUrl: 'partials/game1/challenge/index.html',
                controller: 'Game1ChallengeController'
            })
            .when('/home', {
                redirectTo: '/game1'
            })
            .otherwise({
                redirectTo: '/game1'
            });
    }]);
