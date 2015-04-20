var gameControllers = angular.module('gameControllers', []);


gameControllers.controller('Game1PracticeController', function GameController($scope, $http) {
    $http.get('js/game1.json').success(function (text) {
        $scope.words = text;
    });
});


