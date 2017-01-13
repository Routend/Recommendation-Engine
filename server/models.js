var db = require('./db');

module.exports = {
  users: {
    get: function(cb) {
      var queryStr = 'SELECT * FROM users';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
  },

  locations: {
    get: function(cb) {
      /*Whole table retrieved because JS appears to be
       *faster than mySql queries for calculations. Revision
       *will be necessary if data grows too large to fit in memory
      */
      var queryStr = 'SELECT * FROM locations';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    }
  }
}