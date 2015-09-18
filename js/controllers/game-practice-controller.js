angular.module('gameApp')
    .controller('GamePracticeSectionsController', function ($scope, $http, $modal, $location) {

        if ((typeof globalSectionId === 'undefined') || ( $.inArray(globalSectionId, possibleSections) == -1)) {
            console.log("no such location");
            $location.path("/home");
        } else {
            // console.log("$.inArray(globalSectionId, possibleSections : " + $.inArray(globalSectionId, possibleSections));
            $http.get('json/game/sections_' + globalSectionId + '.json').success(function (sectionsContent) {
                $scope.sections = sectionsContent;
            });
        }


        $scope.getTemplateUrl = function (name) {
            return 'partials/game/definitions/' + name + '.html';
        };

        $scope.getSectionId = function () {
            return globalSectionId;
        }

        window.scoreCounter = 0;

        $scope.open = function (msg, loadTemplate) {

            // console.log('sectionName: ' + sectionName);
            //$('#' + sectionName + ' .text a').addClass('disabled');

            var modalInstance = $modal.open({
                templateUrl: 'partials/feedback/' + loadTemplate + '.html',
                controller: 'GamePracticeModalWindowController',
                resolve: {
                    msg: function () {
                        $scope.message = angular.copy(msg);
                        return $scope.message;
                    }
                },
                backdrop: 'static'
            });
        };

        correctWords = [];

        $scope.showHideDefinition = true;

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

            // console.log("lookingForPartOfSpeech: " + lookingForPartOfSpeech);
            // console.log("whereAreWeLooking: " + whereAreWeLooking);
            // console.log("whereAreWeLooking.indexOf(lookingForPartOfSpeech): " + whereAreWeLooking.indexOf(lookingForPartOfSpeech));

            if (whereAreWeLooking.indexOf(lookingForPartOfSpeech) != -1) {

                correctText = wordIDElem.text();

                correctWords.push(correctText);

                wordIDElem.closest('.task-tab-content').find('a').filter(function () {
                    return $(this).text().toLowerCase() === correctText.toLowerCase();
                }).addClass('correct');

                scoreCounter = scoreCounter + 1;
                wordIDElem.closest('.task-tab-content').find('.current-score').text(scoreCounter);
                outOfNumberLocal = parseInt(wordIDElem.closest('.task-tab-content').find('.total-number-of-instances').text());

                // console.log ("scoreCounter: " + scoreCounter);
                // console.log("outOfNumberLocal: " + outOfNumberLocal);
                // console.log("partOfSpeechTitle: " + partOfSpeechTitle);


                if (scoreCounter == outOfNumberLocal) {

                    if (outOfNumberLocal == 1) {
                        congratsMsg = outOfNumberLocal + " " + partOfSpeechTitle.substring(0, partOfSpeechTitle.length - 1) + ": " + correctWords.join(', ');
                    } else {
                        congratsMsg = outOfNumberLocal + " " + partOfSpeechTitle + ": " + correctWords.join(', ');
                    }


                    $scope.open(congratsMsg, 'congratsTryDifferent');
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

        $scope.getTotalNumberOfInstance = function (partOfSpeech) {
            // console.log("partOfSpeech: " + partOfSpeech);

            var collection = $('#' + partOfSpeech).find('.' + partOfSpeech);
            var knownWords = [];
            for (var i = 0; i < collection.length; i++) {
                if (knownWords.indexOf(collection[i].text.toUpperCase()) == -1) {
                    knownWords.push(collection[i].text.toUpperCase());
                }
            }

            // console.log("numberOfInstances: " + knownWords.length);

            return knownWords.length;


        };


    });



