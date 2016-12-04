angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    .when('/albums', {
        templateUrl: 'views/album.html',
        controller: 'AlbumController'
    });

$locationProvider.html5Mode(true);

}]);
