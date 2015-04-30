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

        lookingForPartOfSpeech = lookingForThis.toLowerCase();
        whereAreWeLooking = theWordIs.toLowerCase();

        console.log ("lookingForPartOfSpeech: " + lookingForPartOfSpeech + '\n' + "whereAreWeLooking: " + whereAreWeLooking);

        if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {
            $('#' + wordID).addClass('correct');

            /* find the html text for this ID & set all a tags that have the same text to correct/wrong class
            htmlText = $('#' + wordID).text();
            console.log ("htmlText: " + htmlText);
            foundIn = $('a:contains(htmlText)');
            console.log ("foundIn: " + foundIn);
            foundIn.addClass('correct');
            */

        } else {
            $('#' + wordID).addClass('wrong');
        }
    };


});



