var models = require('../models');
var users = require('./users.js');

module.exports = {
  get: function(req, res) {
    models.locations.get(function(err, results) {
      if (err) {
        console.log('Error: ', err);
      }
      users.get(function(err, results) {
        
      });

      res.json(results);
    });
  }
}