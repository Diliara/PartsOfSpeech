var gameControllers = angular.module('gameControllers', []);


gameControllers.controller('Game1PracticeController', function GameController($scope, $http) {
    $http.get('js/game1.json').success(function (text) {
        $scope.words = text;
    });




    //Looking for
    $scope.lookingFor = function (lookingForThis, theWordIs, wordIndex) {

        wordID = "word_" + wordIndex;
        if (lookingForThis == theWordIs) {
             $('#' + wordID).addClass('correct');

        } else {
            $('#' + wordID).addClass('wrong');
        }
    }

});


