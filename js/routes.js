angular.module('gameApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index.html'
        })
            .when('/game0', {
                templateUrl: 'partials/game0/index.html'
            })

            .when('/game1', {
                templateUrl: 'partials/game1/index.html'
            })


            .when('/game0/practice', {
                templateUrl: 'partials/game0/practice/index.html',
                controller: 'Game0PracticeController'
            })
            .when('/game0/challenge', {
                templateUrl: 'partials/game0/challenge/index.html',
                controller: 'Game0ChallengeController'
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
                redirectTo: '/'
            })

            .otherwise({
                redirectTo: '/'
            });
    }]);
