//random number between 1 and 3
var randomNumber = Math.floor((Math.random() * 3) + 1);

angular.module('gameApp')
    .controller('TextWordsController', function ($scope, $http) {


        console.log("random number: " + randomNumber);


        $http.get('json/game/text_option_' + randomNumber + '.json').success(function (text) {
            $scope.words = text;
        });


    });