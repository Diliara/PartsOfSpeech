angular.module('gameApp')
    .controller('TextWordsController', function ($scope, $http) {

        //random number between 1 and 3
        var randomNumber = Math.floor((Math.random() * 3) + 1);


        $http.get('json/game/text_option_' + randomNumber + '.json').success(function (text) {
            $scope.words = text;
        });


    });