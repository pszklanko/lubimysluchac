angular.module('AlbumCtrl', []).controller('AlbumController', function($scope, $http, $uibModal) {

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

  $scope.animationsEnabled = true;
  $scope.open = function (size, parentSelector) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };

  $scope.getAlbums();
});
