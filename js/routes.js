angular.module('gameApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index.html'
        })
            .when('/test', {
                templateUrl: 'partials/test/index.html'
            })

            .when('/game', {
                templateUrl: 'partials/game/index.html'
            })


            .when('/test/practice', {
                templateUrl: 'partials/test/practice/index.html',
                controller: 'TestPracticeController'
            })
            .when('/test/challenge', {
                templateUrl: 'partials/test/challenge/index.html',
                controller: 'TestChallengeController'
            })

            .when('/game/practice', {
                templateUrl: 'partials/game/practice/index.html',
                controller: 'GamePracticeController'
            })
            .when('/game/challenge', {
                templateUrl: 'partials/game/challenge/index.html',
                controller: 'GameChallengeController'
            })

            .when('/home', {
                redirectTo: '/'
            })

            .otherwise({
                redirectTo: '/'
            });
    }]);
