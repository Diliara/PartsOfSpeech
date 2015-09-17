angular.module('gameApp')

    .controller('GameChallengeModalWindowController', function ($scope, $modalInstance, msg) {

        $scope.message = msg;
        $scope.ok = function () {
            $modalInstance.close();
            $('#start-stop-btn').click();

        };

        $scope.okFinal = function () {
            $modalInstance.close();
        };
        


    });
