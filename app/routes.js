var Album = require('./models/albums');

    module.exports = function(app) {

        // server routes ===========================================================

        app.get('/albums', function(req, res) {
            Album.find(function(err, albums) {

                if (err)
                    res.send(err);

                res.json(albums);
            });
        });

        app.post('/album', function(req, res) {
          album = new Album();
          album.title = req.body.title;
          album.artist = req.body.artist;

          album.save(function(err) {
            if (err) res.send(err);

            res.json({message: 'Album created!'});
          })
        });
// TODO 'update' and probably 'remove' of NULL element
        app.put('/album', function(req, res) {
          Album.findById(req.body.id, function(err, album) {
            album.update({
              title: req.body.title,
              artist: req.body.artist
            }, function (err, album) {
              if(err) res.send(err);

              res.json({message: 'Album edited! ' + album.id});
            });
          });
        });

        app.delete('/album', function(req, res) {
          Album.findById(req.body.id, function(err, album) {
            album.remove(function (err, album) {
              if(err) res.send(err);

              res.json({message: 'Album removed! ' + album.id});
            });
          });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendFile('./public/views/index.html'); // load our public/index.html file
        });

    };
