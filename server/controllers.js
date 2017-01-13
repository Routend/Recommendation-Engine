var models = require('./models.js');

module.exports = {
  users: {
    get: function(req, res) {
      var setA = [];
      var setB = [];
      //Fetch locations to compare user interests
      models.locations.get(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        }
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          if (results[i].id_users) {

          }
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