var express = require('express');
var db = require('./db');
var cluster = require('cluster');

var parser = require('body-parser');
var morgan = require('morgan');

var router = require('./routes.js');

if (cluster.isMaster) {
  var cpus = require('os').cpus().length;
  for (var i = 0; i < cpus; i += 1) {
      cluster.fork();
  }
  cluster.on('exit', function(worker) {
    console.log('worker ' + worker.id +  ' died');
    cluster.fork();
  });
} else {
  var app = express();
  app.get('/', function (req, res) {
      res.send('Hello World');
  });

  app.set('port', 8000);

  app.use(parser.json());
  app.use(morgan('dev'));

  app.use('/', router);

  app.listen(app.get('port'));
  console.log('Running on port ' + app.get('port'));
}


module.exports = app;