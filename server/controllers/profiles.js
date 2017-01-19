var models = require('../models.js');

module.exports = {
  get: function(req, res) {
    var params = [req.query.id_user1, req.query.id_user2, req.query.id_user3, req.query.id_user4];
    models.matches.get(params, function(err, results) {
      if (err) {
        console.log("Error: ", err);
      }
      return results;
    });
  }
}