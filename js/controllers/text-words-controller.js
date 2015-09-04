angular.module('gameApp')
    .controller('TextWordsController', function ($scope, $http) {
        $http.get('json/game/text_option_1.json').success(function (text) {
            $scope.words = text;
        });

        /*
        $scope.getTotalNumberOfInstance = function (partOfSpeech) {
            console.log("partOfSpeech: " + partOfSpeech);
        };
        */


    });