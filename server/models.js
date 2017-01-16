var db = require('./db');

module.exports = {
  users: {
    get: function(cb) {
      var queryStr = 'SELECT * FROM users';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
    getOne: function(params, cb) {
      var queryStr = 'SELECT * FROM users WHERE id = ?';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    getNumber: function(cb) {
      var queryStr = 'SELECT COUNT(*) FROM users';
      db.query(queryStr, function(err, results) {
        cb(err, results[0]["COUNT(*)"]);
      });
    }
  },

  locations: {
    get: function(cb) {
      /*Whole table retrieved because JS appears to be
       *faster than MySQL queries for calculations. Revision
       *will be necessary if data grows too large to fit in memory
      */
      var queryStr = 'SELECT * FROM locations';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
    getByUser: function(params, cb) {
      var queryStr = 'SELECT * FROM locations WHERE id_users IN (';
      for (var i = 0; i < params.length - 1; i++) {
        if (i === params.length - 2) {
          queryStr += '?';
        } else {
          queryStr += '?,';
        }
      }
      //Don't recommend other users' work or home, and don't recommend locations user already has
      queryStr += ') AND name NOT IN (SELECT name FROM locations WHERE id_users = ?) AND category <> "work" AND category <> "home"';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    }
  }
}