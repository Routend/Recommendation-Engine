var models = require('../models.js');

module.exports = {
  get: function(req, res) {
    var params = [req.query.id_users];
    models.matches.get(params, function(err, results) {
      if (err) {
        console.log("Error: ", err);
      }
      return results;
    })
  }
}