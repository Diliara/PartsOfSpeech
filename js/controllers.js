var gameControllers = angular.module('gameControllers', ['ui.bootstrap']);

gameControllers.controller('Game1PracticeTabsController', function ($scope, $http) {

     $http.get('js/game1_tabs.json').success(function (tabsContent) {
     $scope.tabs = tabsContent;
     });


});


gameControllers.controller('Game1PracticeController', function ($scope, $http) {
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



