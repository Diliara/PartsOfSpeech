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
    $scope.lookingFor = function (lookingForThis, taskNumber, theWordIs, wordIndex) {

        wordID = "word_" + taskNumber + "_" + wordIndex;
        wordIDElem = $('#' + wordID);

        lookingForPartOfSpeech = lookingForThis.toLowerCase();
        whereAreWeLooking = theWordIs.toLowerCase();

        /* console.log("lookingForPartOfSpeech: " + lookingForPartOfSpeech + '\n' + "whereAreWeLooking: " + whereAreWeLooking); */


        if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

            correctText = wordIDElem.text();

            wordIDElem.closest('.text').children('a').filter(function () {
                return $(this).text().toLowerCase() === correctText.toLowerCase();
            }).addClass('correct');


        } else {
            wrongText = wordIDElem.text();

            wordIDElem.closest('.text').children('a').filter(function () {
                return $(this).text().toLowerCase() === wrongText.toLowerCase();
            }).addClass('wrong');
        }
    };


});



