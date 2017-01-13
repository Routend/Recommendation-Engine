var controller = require('./controllers.js');
var router = require('express').Router();

router.get('/users', controller.users.get);

router.get('/locations', controller.locations.get);

module.exports = router;
