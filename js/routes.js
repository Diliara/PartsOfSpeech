angular.module('gameApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index.html'
        })
            .when('/game1', {
                templateUrl: 'partials/game1/index.html'
            })

            .when('/game2', {
                templateUrl: 'partials/game2/index.html'
            })


            .when('/game1/practice', {
                templateUrl: 'partials/game1/practice/index.html',
                controller: 'Game1PracticeController'
            })
            .when('/game1/challenge', {
                templateUrl: 'partials/game1/challenge/index.html',
                controller: 'Game1ChallengeController'
            })

            .when('/game2/practice', {
                templateUrl: 'partials/game2/practice/index.html',
                controller: 'Game2PracticeController'
            })
            .when('/game2/challenge', {
                templateUrl: 'partials/game2/challenge/index.html',
                controller: 'Game2ChallengeController'
            })

            .when('/home', {
                redirectTo: '/'
            })

            .otherwise({
                redirectTo: '/'
            });
    }]);
