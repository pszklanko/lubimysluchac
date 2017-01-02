var spdy = require('spdy');
var fs   = require('fs');

var options = {
  key: ,
  cert: ,
  spdy: {
    protocols: ['h2', 'http/1.1'],
    plain: false,
    connection: {
      windowSize: 1024 * 1024,
      autoSpdy31: false
    }
  }
};

var server = spdy.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('Siema!');
});

server.listen(3000);
