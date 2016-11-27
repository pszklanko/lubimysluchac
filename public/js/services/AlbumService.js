angular.module('AlbumService', []).factory('Album', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/albums');
        },


        // call to POST and create a new album
        create : function(albumData) {
            return $http.post('/api/albums', albumData);
        },

        // call to DELETE a album
        delete : function(id) {
            return $http.delete('/api/albums/' + id);
        }
    }

}]);
