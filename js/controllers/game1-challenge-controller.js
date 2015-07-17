angular.module('gameApp')
    .controller('Game1ChallengeTabsController', function ($scope, $http) {

        $http.get('json/game1/game1_tabs.json').success(function (tabsContent) {
            $scope.tabs = tabsContent;
        });


        $scope.startChallenge = function () {
            $('.start-challenge').slideDown();
            $('.btn-start').hide();
            $('.set-timer').show();


        };

    })
    .controller('Game1ChallengeController', function ($scope, $http) {
        $http.get('json/game1/game1.json').success(function (text) {
            $scope.words = text;
        });

        $scope.totalCounter = 12;

        window.scoreCounter = 0;

        //Looking for
        $scope.lookingFor = function (partOfSpeechTitle, lookingForThis, taskNumber, theWordIs, wordIndex) {

            wordID = "word_" + taskNumber + "_" + wordIndex;
            wordIDElem = $('#' + wordID);

            lookingForPartOfSpeech = lookingForThis;
            whereAreWeLooking = theWordIs;

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

            $('.start-challenge').slideUp();
            $('.btn-start').show();


        };


    });