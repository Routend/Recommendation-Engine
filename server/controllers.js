var models = require('./models.js');

module.exports = {
  users: {
    get: function(req, res) {
      models.users.get(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        }

        res.json(results);
      });
    }
  },

  locations: {
    get: function(req, res) {
      models.locations.get(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        }

        res.json(results);
      });
    }
  }
}