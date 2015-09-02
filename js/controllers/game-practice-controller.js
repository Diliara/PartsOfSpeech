angular.module('gameApp')
    .controller('GamePracticeController', function ($scope, $http) {
        $http.get('json/game/game.json').success(function (text) {
            $scope.words = text;
        });

    })
    .controller('GamePracticeTabsController', function ($scope, $http, $modal) {

        $http.get('json/game/game_tabs.json').success(function (tabsContent) {
            $scope.tabs = tabsContent;
        });

        $scope.getTemplateUrl = function(name){
            return 'partials/game/definitions/' + name + '.html';
        };

        window.scoreCounter = 0;

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

            //  console.log("lookingForPartOfSpeech: " + lookingForPartOfSpeech);
            //   console.log("whereAreWeLooking: " + whereAreWeLooking);
            //   console.log("whereAreWeLooking.indexOf(lookingForPartOfSpeech): " + whereAreWeLooking.indexOf(lookingForPartOfSpeech));

            if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

                correctText = wordIDElem.text();

                correctWords.push(correctText);

                wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                    return $(this).text().toLowerCase() === correctText.toLowerCase();
                }).addClass('correct');

                scoreCounter = scoreCounter + 1;
                wordIDElem.closest('.task-tab-content').find('.current-score').text(scoreCounter);
                outOfNumberLocal = parseInt(wordIDElem.closest('.task-tab-content').find('.tab-counter').text());
                // console.log ("scoreCounter: " + scoreCounter);
                // console.log ("outOfNumberLocal: " + outOfNumberLocal);

                if (scoreCounter == outOfNumberLocal) {
                    congratsMsg = outOfNumberLocal + " " + partOfSpeechTitle + ": " + correctWords.join(', ');

                    $scope.open(congratsMsg);
                    correctWords = [];
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
            correctWords = [];
        };


    })
    .controller('ModalWindowController', function ($scope, $modalInstance, msg) {
        //$('.text a').addClass('disabled');
        $scope.message = msg;
        $scope.ok = function () {
            $modalInstance.close();
        };

    });


