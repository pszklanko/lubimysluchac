// var spdy = require('spdy');
// var fs   = require('fs');
//
// var express        = require('express');
// var bodyParser     = require('body-parser');
// var methodOverride = require('method-override');
// var mongoose       = require('mongoose');
// var app            = express();

const port    = 8080
const spdy    = require('spdy')
const express = require('express')
const path    = require('path')
const fs      = require('fs')

const app     = express()

app.get('/', (req, res) => {
  res.send(`hello, http2!
go to /pushy`)
});

app.get('/pushy', (req, res) => {
  var stream = res.push('/libs/angular/angular.min.js', {
      status: 200, // optional
      method: 'GET', // optional
      request: {accept: '*/*'},
      response: {'content-type': 'application/javascript'}
    })
    var stream1 = res.push('/libs/angular-route/angular-route.min.js', {
        status: 200, // optional
        method: 'GET', // optional
        request: {accept: '*/*'},
        response: {'content-type': 'application/javascript'}
      })
      var stream2 = res.push('/libs/angular-bootstrap/ui-bootstrap-tpls.min.js', {
          status: 200, // optional
          method: 'GET', // optional
          request: {accept: '*/*'},
          response: {'content-type': 'application/javascript'}
        })
    stream.on('error', function() {})
    stream.end('')
    res.write('<script src="libs/angular/angular.min.js"></script>');
    res.write('<script src="libs/angular-route/angular-route.min.js"></script>');
    res.write('<script src="libs/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>');
    res.end();
});

const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt')
};

spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log('Listening on port ' + port + '.');
    }
  })
// exports = module.exports = app;
