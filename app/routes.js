var Album = require('./models/album');

    module.exports = function(app) {

        // server routes ===========================================================

        // sample api route
        app.get('/api/albums', function(req, res) {
            // use mongoose to get all nerds in the database
            Album.find(function(err, nerds) {

                if (err)
                    res.send(err);

                res.json(albums);
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
