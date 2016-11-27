angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    // nerds page that will use the NerdController
    .when('/albums', {
        templateUrl: 'views/album.html',
        controller: 'AlbumController'
    });

$locationProvider.html5Mode(true);

}]);
