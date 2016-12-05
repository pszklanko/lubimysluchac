angular.module('AlbumCtrl', []).controller('AlbumController', function($scope, $http) {

  $scope.albums = [];
  $scope.newAlbum = {};

  $scope.getAlbums = function() {
    $http.get('/api/albums')
      .success(function(data) {
        $scope.albums = data;
      });
    };

  $scope.addAlbum = function(newAlbum) {
    $http.post('/api/album', {'artist': newAlbum.artist,
                              'title': newAlbum.title})
      .success(function() {
        $scope.newAlbum = {};
        $scope.getAlbums();
      }).
      error(function(err) {
        console.log(err);
      });
  };

  $scope.deleteAlbum = function(id) {
    $http.delete('/api/album/' + id)
      .success(function() {
        $scope.getAlbums();
        alert('Usunieto album!');
      }).
      error(function(err) {
        console.log(err);
      });
  };

  $scope.editAlbum = function(album) {
    $http.put('/api/album/', {'id': album._id,
                              'artist': album.artist,
                              'title': album.title})
      .success(function() {
        $scope.getAlbums();
        alert('Edytowano album!');
      }).
      error(function(err) {
        console.log(err);
      });
  };

  $scope.getAlbums();
});
