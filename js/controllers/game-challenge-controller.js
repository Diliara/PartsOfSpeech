angular.module('gameApp')

    .controller('GameChallengeSectionsController', function ($scope, $http, $modal) {

        $http.get('json/game/sections_1-3.json').success(function (sectionsContent) {
            $scope.sections = sectionsContent;
        });

        $scope.getTemplateUrl = function (name) {
            return 'partials/game/definitions/' + name + '.html';
        };

        window.scoreCounterLocal = 0;
        window.scoreCounterTotal = 0;


        $scope.startChallenge = function () {
            $('.start-challenge').slideDown();
            $('.btn-start').hide();
            $('.initialTimer').hide();
            /*
             $('#start-stop-btn').show().click();
             */

            $('#start-stop-btn').click();


        };


        $scope.openModalWindow = function (msg, loadTemplate) {

            $('#start-stop-btn').click();


            //  console.log('sectionName: ' + sectionName);
            //var sectionNameElem = '#' + sectionName;
            //$(sectionNameElem + ' .text a').addClass('disabled');

            var modalInstance = $modal.open({
                templateUrl: 'partials/feedback/' + loadTemplate + '.html',
                controller: 'GameChallengeModalWindowController',
                resolve: {
                    msg: function () {
                        $scope.message = angular.copy(msg);
                        return $scope.message;
                    }
                }
            });

            /*
             var currentTab = '#tab_' + sectionName;
             //console.log('currentTab: ' + currentTab);

             $(currentTab).removeClass('active');
             $(currentTab).next().addClass('active');

             var currentTabContent = '#tabContent_' + sectionName;
             console.log('currentTabContent: ' + currentTabContent);

             $(sectionNameElem).closest('.tab-pane').removeClass('active');
             $(sectionNameElem).closest('.tab-pane').next().addClass('active');

             $scope.changeTab();
             */


        };


        correctWords = [];

        $scope.openDefinition = function () {

            if ($scope.showHideDefinition == true) {
                $scope.showHideDefinition = false;
            } else {
                $scope.showHideDefinition = true;
            }

            $(".definition").slideToggle();

        };


        //Looking for
        $scope.lookingFor = function (partOfSpeechTitle, lookingForThis, taskNumber, theWordIs, wordIndex) {

            wordID = "word_" + taskNumber + "_" + wordIndex;
            wordIDElem = $('#' + wordID);

            lookingForPartOfSpeech = lookingForThis;
            whereAreWeLooking = theWordIs;

            scoreSection = "score-" + lookingForPartOfSpeech;
            scoreSectionIDElem = $('#' + scoreSection);

            //console.log("lookingForPartOfSpeech: " + lookingForPartOfSpeech + '\n' + "whereAreWeLooking: " + whereAreWeLooking);

            if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

                correctText = wordIDElem.text();
                correctWords.push(correctText);


                wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                    return $(this).text().toLowerCase() === correctText.toLowerCase();
                }).addClass('correct');

                scoreCounterLocal = scoreCounterLocal + 1;

                // console.log("scoreCounterLocal: " + scoreCounterLocal);

                scoreCounterTotal = scoreCounterTotal + 1;

                scoreSectionIDElem.find('.section-score-current').text(scoreCounterLocal);
                $('.total-current-score').text(scoreCounterTotal);


                outOfNumberLocal = parseInt(scoreSectionIDElem.find('.total-number-for-the-section').text());
                outOfNumberTotal = parseInt($('.total-score-all-sections').text());


                // console.log("scoreCounterLocal: " + scoreCounterLocal + " outOfNumberLocal: " + outOfNumberLocal);


                if ((scoreCounterLocal == outOfNumberLocal) && (scoreCounterTotal !== outOfNumberTotal)) {


                    if (outOfNumberLocal == 1) {
                        congratsMsg = outOfNumberLocal + " " + partOfSpeechTitle.substring(0, partOfSpeechTitle.length - 1) + ": " + correctWords.join(', ');
                    } else {
                        congratsMsg = outOfNumberLocal + " " + partOfSpeechTitle + ": " + correctWords.join(', ');
                    }


                    $scope.openModalWindow(congratsMsg, 'congratsTryNext');
                    correctWords = [];


                    var lookingForPartOfSpeechElem = '#' + lookingForPartOfSpeech;

                    var currentTab = '#tab_' + lookingForPartOfSpeech;
                    //console.log('currentTab: ' + currentTab);

                    $(currentTab).removeClass('active');
                    $(currentTab).next().addClass('active');

                    var currentTabContent = '#tabContent_' + lookingForPartOfSpeech;
                    //console.log('currentTabContent: ' + currentTabContent);

                    $(lookingForPartOfSpeechElem).closest('.tab-pane').removeClass('active');
                    $(lookingForPartOfSpeechElem).closest('.tab-pane').next().addClass('active');

                    $scope.changeTab();


                }

                if (scoreCounterTotal == outOfNumberTotal) {
                    $scope.openModalWindow("Yay, you've completed the challenge!!!", 'congratsFinal');
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

            //$('a').removeClass('correct').removeClass('wrong');


            // $('.total-current-score').text(scoreCounterTotal);
            correctWords = [];


            //   $('.start-challenge').slideUp();
            //   $('.btn-start').show();


        };

        $scope.getTotalNumberOfInstance = function (partOfSpeech) {


            var collectionOfInstances = $('#' + partOfSpeech).find('.' + partOfSpeech);
            var totalNumberOfInstance = [];
            for (var i = 0; i < collectionOfInstances.length; i++) {
                if (totalNumberOfInstance.indexOf(collectionOfInstances[i].text.toUpperCase()) == -1) {
                    totalNumberOfInstance.push(collectionOfInstances[i].text.toUpperCase());
                }
            }

            //console.log("partOfSpeech: " + partOfSpeech + "; numberOfInstances: " + totalNumberOfInstance.length);
            return totalNumberOfInstance.length;

        };


        $scope.getTotalNumberFromAllSections = function (totalNumberForTheSection) {

            var collectionOfTotalNumbers = $(totalNumberForTheSection);
            //console.log("collectionOfTotalNumbers.length: " + collectionOfTotalNumbers.length);

            var totalNumberFromAllSections = 0;

            for (var i = 0; i < collectionOfTotalNumbers.length; i++) {
                // console.log("collectionOfTotalNumbers[i].text: " + $(collectionOfTotalNumbers[i]).text());
                totalNumberFromAllSections = totalNumberFromAllSections + Number($(collectionOfTotalNumbers[i]).text());
                // console.log('totalNumberFromAllSections: ' + totalNumberFromAllSections);
            }
            return totalNumberFromAllSections;
        };


        $scope.timerIndex = 0;


        $scope.getTimerForASection = function (totalNumberFromAllSections, secondsPerOneInstance) {

            var numberOfSeconds = totalNumberFromAllSections * secondsPerOneInstance;
            //console.log(numberOfSeconds);

            $('.initialTimer').text(numberOfSeconds);

            return Number(numberOfSeconds);


        }



        $scope.callbackTimer = {};
       // $scope.callbackTimer.status = 'Running';
       // $scope.callbackTimer.callbackCount = 0;

        $scope.callbackTimer.finished = function () {
          //  $scope.callbackTimer.status = 'COMPLETE!!';
          //  $scope.callbackTimer.callbackCount++;
            $scope.openModalWindow("You are out of time. Try again!", 'gameOverOutOfTime');
            $scope.$apply();
        };


    });



