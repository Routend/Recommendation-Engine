var express = require('express');
var db = require('./db');
var controller = require('./controllers');

var parser = require('body-parser');
var morgan = require('morgan');

var router = require('./routes.js');

var app = express();

app.set('port', 8000);

app.use(parser.json());
app.use(morgan('dev'));

app.use('/', router);

app.listen(app.get('port'));
console.log('Running on port ' + app.get('port'));

module.exports = app;