var Album = require('./models/albums');

    module.exports = function(app) {

        // server routes ===========================================================

        app.get('/api/albums', function(req, res) {
            Album.find(function(err, albums) {

                if (err)
                    res.send(err);

                res.json(albums);
            });
        });

        app.post('/api/album', function(req, res) {
          album = new Album();
          album.title = req.body.title;
          album.artist = req.body.artist;

          album.save(function(err) {
            if (err) res.send(err);

            res.json({message: 'Album created!'});
          })
        });
// TODO 'update' and probably 'remove' of NULL element
        app.put('/api/album', function(req, res) {
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

        app.delete('/api/album/:id', function(req, res) {
          Album.findById(req.params.id, function(err, album) {
            album.remove(function (err, album) {
              if(err) res.send(err);

              res.json({message: 'Album removed! ' + album.id});
            });
          });
        });

        // frontend routes =========================================================
        app.get('*', function(req, res) {
            res.sendFile('/home/ps/lubimysluchac/public/index.html');
        });

    };
