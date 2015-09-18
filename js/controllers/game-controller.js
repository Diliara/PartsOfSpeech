angular.module('gameApp')

    .controller('GameController', function ($scope, $routeParams, $location) {
        $scope.sectionId = $routeParams.sectionId;
        globalSectionId = $scope.sectionId.substr(1);
        console.log("globalSectionId: " + globalSectionId);

        possibleSections = ['1-3', '1-4', '1-5', '1-6', 'test'];

        $scope.getListOfSections = function () {


            switch (globalSectionId) {
                case '1-3':
                    return 'Determiners, Articles, Pronouns'
                    break;
                case '1-4':
                    return 'Determiners, Articles, Pronouns, Prepositions'
                    break;
                case '1-5':
                    return 'Determiners, Articles, Pronouns, Prepositions, Verbs'
                    break;
                case '1-6':
                    return 'Determiners, Articles, Pronouns, Prepositions, Verbs, Conjunctions'
                    break;
                default:
                    $location.path("/home");

            }


        }



    });


