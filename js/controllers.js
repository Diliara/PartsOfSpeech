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

    window.scoreCounter = 0;

    //Looking for
    $scope.lookingFor = function (partOfSpeechTitle, lookingForThis, taskNumber, theWordIs, wordIndex) {

        wordID = "word_" + taskNumber + "_" + wordIndex;
        wordIDElem = $('#' + wordID);

        lookingForPartOfSpeech = lookingForThis.toLowerCase();
        whereAreWeLooking = theWordIs.toLowerCase();

        /* console.log("lookingForPartOfSpeech: " + lookingForPartOfSpeech + '\n' + "whereAreWeLooking: " + whereAreWeLooking); */

        if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

            correctText = wordIDElem.text();

            wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                return $(this).text().toLowerCase() === correctText.toLowerCase();
            }).addClass('correct');

            scoreCounter = scoreCounter + 1;
            /* console.log("scoreCounter: " + scoreCounter); */
            wordIDElem.closest('.task-tab-content').find('.current-score').text(scoreCounter);

            outOfNumber = parseInt(wordIDElem.closest('.task-tab-content').find('.counter .tab-counter').text());

            /* console.log("found: " + scoreCounter + "\n out of: " + outOfNumber); */

            if (scoreCounter == outOfNumber) {
                alert("Congratulations! You found all " + outOfNumber + " " + partOfSpeechTitle + "!");

            }


        } else {
            wrongText = wordIDElem.text();

            wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                return $(this).text().toLowerCase() === wrongText.toLowerCase();
            }).addClass('wrong');
        }
    };
    $scope.changeTab = function () {

        //reset level - reset score, clean up the paragraph.
        window.scoreCounter = 0;
        $('a').removeClass('correct').removeClass('wrong');
        $('.current-score').text(scoreCounter);


    };


});


gameControllers.controller('Game1ChallengeTabsController', function ($scope, $http) {

    $http.get('js/game1_tabs.json').success(function (tabsContent) {
        $scope.tabs = tabsContent;
    });

    /*
     $scope.start = function (duration) {
     $('.set-timer').append("<p class='timer' timer-plugin=\"" + "{css_class: \'countdown\', always_show_days: false, with_labels: true, with_seconds: true, with_separators: true, label_dd: '', label_hh: '', label_mm: 'M', label_ss: 'S', separator: ' ', separator_days: ',' }\">" + duration + "</p>");
     console.log(duration);
     };
     */


});

gameControllers.controller('Game1ChallengeController', function ($scope, $http) {
    $http.get('js/game1.json').success(function (text) {
        $scope.words = text;
    });

    window.scoreCounter = 0;

    //Looking for
    $scope.lookingFor = function (partOfSpeechTitle, lookingForThis, taskNumber, theWordIs, wordIndex) {

        wordID = "word_" + taskNumber + "_" + wordIndex;
        wordIDElem = $('#' + wordID);

        lookingForPartOfSpeech = lookingForThis.toLowerCase();
        whereAreWeLooking = theWordIs.toLowerCase();

        /* console.log("lookingForPartOfSpeech: " + lookingForPartOfSpeech + '\n' + "whereAreWeLooking: " + whereAreWeLooking); */

        if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

            correctText = wordIDElem.text();

            wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                return $(this).text().toLowerCase() === correctText.toLowerCase();
            }).addClass('correct');

            scoreCounter = scoreCounter + 1;
            /* console.log("scoreCounter: " + scoreCounter); */
            wordIDElem.closest('.task-tab-content').find('.current-score').text(scoreCounter);

            outOfNumber = parseInt(wordIDElem.closest('.task-tab-content').find('.counter .tab-counter').text());
            /* console.log("found: " + scoreCounter + "\n out of: " + outOfNumber); */

            if (scoreCounter == outOfNumber) {
                alert("Congratulations! You found all " + outOfNumber + " " + partOfSpeechTitle + "!");

            }


        } else {
            wrongText = wordIDElem.text();

            wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                return $(this).text().toLowerCase() === wrongText.toLowerCase();
            }).addClass('wrong');
        }
    };

    $scope.changeTab = function () {

        //reset level - reset score, clean up the paragraph.
        window.scoreCounter = 0;
        $('a').removeClass('correct').removeClass('wrong');
        $('.current-score').text(scoreCounter);


    };


});
