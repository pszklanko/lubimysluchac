var Album = require('./models/albums');
var fs             = require('fs');

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

        app.get('/empty', function(req, res) {
          res.writeHead(200);
          res.end('');
        });

        app.get('/push', function(req, res) {
          //res.sendFile('/home/ps/lubimysluchac/public/push.html');
          fs.readFile('/home/ps/lubimysluchac/public/push.html', function read(err, data) {
            if(err) {
              throw err;
            }
            content = data;
          var stream = res.push('/push.html', {
            status: 200, // optional
            method: 'GET', // optional
            request: { accept: '*/*' },
            response: { 'content-type': 'text/html; charset=UTF-8' }
          })
          stream.on('error', function() {

          })
          stream.end(content)
          res.write(content)
        })

          fs.readFile('/home/ps/lubimysluchac/public/libs/jquery/dist/jquery.js', function read(err, data) {
            if(err) {
              throw err;
            }
            content = data;
            var stream1 = res.push('/libs/jquery/dist/jquery.js', {
              status: 200, // optional
              method: 'GET', // optional
              request: { accept: '*/*' },
              response: { 'content-type': 'application/javascript' }
            })
            stream1.on('error', function() {})
            stream1.end(content)
            res.end();
          })
        })

        // frontend routes =========================================================
        app.get('*', function(req, res) {
            res.sendFile('/home/ps/lubimysluchac/public/index.html');
        });

    };
