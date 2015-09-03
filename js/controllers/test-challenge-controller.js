angular.module('gameApp')

    .controller('TestChallengeController', function ($scope, $http) {

        $http.get('json/test/test.json').success(function (text) {
            $scope.words = text;
        });

        $scope.totalCounter = 33;
        window.scoreCounterLocal = 0;
        window.scoreCounterTotal = 0;

    })

    .controller('TestChallengeTabsController', function ($scope, $http, $modal) {

        $http.get('json/test/test_tabs.json').success(function (tabsContent) {
            $scope.tabs = tabsContent;
            $scope.sections = tabsContent;
        });

        $scope.startChallenge = function () {
            $('.start-challenge').slideDown();
            $('.btn-start').hide();
            $('.set-timer').show();
        };


        $scope.open = function (msg) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/congratulations.html',
                controller: 'ModalWindowController',
                resolve: {
                    msg: function () {
                        $scope.message = angular.copy(msg);
                        return $scope.message;
                    }
                }
            });
        };

        correctWords = [];

        //Looking for
        $scope.lookingFor = function (partOfSpeechTitle, lookingForThis, taskNumber, theWordIs, wordIndex) {

            wordID = "word_" + taskNumber + "_" + wordIndex;
            wordIDElem = $('#' + wordID);

            lookingForPartOfSpeech = lookingForThis;
            whereAreWeLooking = theWordIs;

            /* console.log("lookingForPartOfSpeech: " + lookingForPartOfSpeech + '\n' + "whereAreWeLooking: " + whereAreWeLooking); */

            if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

                correctText = wordIDElem.text();
                correctWords.push(correctText);


                wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                    return $(this).text().toLowerCase() === correctText.toLowerCase();
                }).addClass('correct');

                scoreCounterLocal = scoreCounterLocal + 1;
                console.log("scoreCounterLocal: " + scoreCounterLocal);
                scoreCounterTotal = scoreCounterTotal + 1;
                wordIDElem.closest('.game-challenge-area').find('.total-current-score').text(scoreCounterTotal);
             /*   wordIDElem.closest('.game-challenge-area').find('.section-score-current').text(scoreCounterLocal); */


                outOfNumberLocal = parseInt(wordIDElem.closest('.task-tab-content').find('.tab-counter').text());
                outOfNumberTotal = parseInt(wordIDElem.closest('.game-challenge-area').find('.total-tab-counter').text());
                console.log("found scoreCounterLocal: " + scoreCounterLocal + " outOfNumberLocal: " + outOfNumberLocal);

                if (scoreCounterLocal == outOfNumberLocal) {

                    if (outOfNumberLocal == 1) {
                        congratsMsg = outOfNumberLocal + " " + partOfSpeechTitle.substring(0, partOfSpeechTitle.length - 1) + ": " + correctWords.join(', ');
                    } else {
                        congratsMsg = outOfNumberLocal + " " + partOfSpeechTitle + ": " + correctWords.join(', ');
                    }


                    $scope.open(congratsMsg);
                    correctWords = [];
                    console.log("scoreCounterTotal: " + scoreCounterTotal);
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
            window.scoreCounterLocal = 0;
            $('a').removeClass('correct').removeClass('wrong');
            // $('.total-current-score').text(scoreCounterTotal);
            correctWords = [];


            //   $('.start-challenge').slideUp();
            //   $('.btn-start').show();


        };

    })


    .controller('ModalWindowController', function ($scope, $modalInstance, msg) {
        //$('.text a').addClass('disabled');
        $scope.message = msg;
        $scope.ok = function () {
            $modalInstance.close();
        };

    });

