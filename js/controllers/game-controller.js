

angular.module('gameApp')

    .controller('GameController', function (  $scope, $routeParams) {
        $scope.sectionId = $routeParams.sectionId;
        globalSectionId = $scope.sectionId.substr(1);
        console.log("globalSectionId: " + globalSectionId);

        possibleSections = ['1-3', '1-4', '1-5', '1-6', 'test'];

    });


