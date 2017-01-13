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

app.get('*', (req, res) => {
    res.writeHead(200);
    res.end('okk');
})

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
