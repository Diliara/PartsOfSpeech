angular.module('gameApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index.html'
        })
            .when('/test', {
                templateUrl: 'partials/test/index.html'
            })
            .when('/test/practice', {
                templateUrl: 'partials/test/practice/index.html',
                controller: 'TestPracticeController'
            })
            .when('/test/challenge', {
                templateUrl: 'partials/test/challenge/index.html',
                controller: 'TestChallengeController'
            })
            .when('/game-development', {
                templateUrl: 'partials/game/development.html'
            })

            .when('/game:sectionId', {
                templateUrl: 'partials/game/index.html',
                controller: 'GameController'
            })
            .when('/game/practice', {
                templateUrl: 'partials/game/practice/index.html',
                controller: 'GamePracticeSectionsController'
            })

            .when('/game/challenge', {
                templateUrl: 'partials/game/challenge/index.html',
                controller: 'GameChallengeSectionsController'
            })

            .when('/home', {
                redirectTo: '/'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
