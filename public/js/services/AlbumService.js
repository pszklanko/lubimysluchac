angular.module('AlbumService', []).factory('Album', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/albums');
        },

        create : function(albumData) {
            return $http.post('/api/album', albumData);
        },

        update : function(albumData) {
            return $http.put('/api/album', albumData);
        },

        delete : function(id) {
            return $http.delete('/api/album', id);
        }
    }

}]);
