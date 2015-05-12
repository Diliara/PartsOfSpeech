angular.module('gameApp')
    .controller('Game1PracticeController', function ($scope, $http) {
        $http.get('json/game1/game1.json').success(function (text) {
            $scope.words = text;
        });

    })
    .controller('Game1PracticeTabsController', function ($scope, $http, $modal) {

        $http.get('json/game1/game1_tabs.json').success(function (tabsContent) {
            $scope.tabs = tabsContent;
        });

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

        //Looking for
        $scope.lookingFor = function (partOfSpeechTitle, lookingForThis, taskNumber, theWordIs, wordIndex) {

            wordID = "word_" + taskNumber + "_" + wordIndex;
            wordIDElem = $('#' + wordID);

            lookingForPartOfSpeech = lookingForThis.toLowerCase();
            whereAreWeLooking = theWordIs.toLowerCase();

            if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

                correctText = wordIDElem.text();

                wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                    return $(this).text().toLowerCase() === correctText.toLowerCase();
                }).addClass('correct');

                scoreCounter = scoreCounter + 1;
                wordIDElem.closest('.task-tab-content').find('.current-score').text(scoreCounter);
                outOfNumber = parseInt(wordIDElem.closest('.task-tab-content').find('.counter .tab-counter').text());

                if (scoreCounter == outOfNumber) {
                    $scope.open("You found all " + outOfNumber + " " + partOfSpeechTitle + "!" + " Try a different task now!");

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


    })
    .controller('ModalWindowController', function ($scope, $modalInstance, msg) {


        $('.text a').addClass('disabled');

        $scope.message = msg;

        $scope.ok = function () {
            $modalInstance.close();
        };

    });


