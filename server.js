// MODULES ============================================
var express        = require('express');
var spdy           = require('spdy'); // HTTP/2
var https          = require('https'); // HTTPS dla HTTP/1.1
var fs             = require('fs');
var app            = express(); // HTTP/1.1
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

// CONFIGURATION ======================================

// config files
var db = require('./config/db');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set port
var port = process.env.PORT || 8080;

//connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// app.use(function(req, res) {
//   var stream = res.push('/libs/bootstrap/dist/css/bootstrap.min.css', {
//      status: 200, // optional
//      method: 'GET', // optional
//      request: {accept: '*/*'},
//      response: {'content-type': 'text/css; charset=UTF-8'}
//    })
//    // var stream1 = res.push('/libs/font-awesome/css/font-awesome.min.css', {
//   //     status: 200, // optional
//   //     method: 'GET', // optional
//   //     request: {accept: '*/*'},
//   //     response: {'content-type': 'text/css; charset=UTF-8'}
//   //   })
//    stream.on('error', function() {})
//    stream.end('')
//    res.write('<link rel="stylesheet" href="libs/bootstrap/dist/css/bootstrap.min.css">');
//    // res.write('<link rel="stylesheet" href="libs/font-awesome/css/font-awesome.min.css">');
//    // res.write('<script src="libs/angular-route/angular-route.min.js"></script>');
//    // res.write('<script src="libs/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>');
//    res.end();
// });

// routes ==================================================
require('./app/routes')(app); // configure our routes

const options = {
  key: fs.readFileSync(__dirname + '/server.key'), //privateKey
  cert: fs.readFileSync(__dirname + '/server.crt') // certificate
};

// start app ===============================================
// HTTP/1.1
// app.listen(port, function() {
//   console.log('listenin on port ' + port);
// });

// HTTP/2
spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log('Listening on port ' + port + '.');
    }
  });

// expose app
exports = module.exports = app;
