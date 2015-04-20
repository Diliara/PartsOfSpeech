var gameApp = angular.module('gameApp', []);


gameApp.controller('GameController', function GameController($scope, $http) {
    $http.get('js/game1.json').success(function (text) {
        $scope.words = text;

    });
});