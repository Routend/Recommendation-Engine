var users = require('./controllers/users');
var locations = require('./controllers/locations');
var router = require('express').Router();

router.get('/users', users.get);

router.get('/locations', locations.get);

module.exports = router;
