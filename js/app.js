var gameApp = angular.module('gameApp', ['ngRoute', 'gameControllers']);

gameApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/game1', {
            templateUrl: 'partials/game1.html'
        }).
        when('/game1_practice', {
            templateUrl: 'partials/game1_practice.html',
            controller: 'Game1PracticeController'
        }).
        otherwise({
            redirectTo: '/game1'
        });
}]);


gameApp.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});
