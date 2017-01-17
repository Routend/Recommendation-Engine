var mysql = require('mysql');


var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'routend'
});

connection.connect();

module.exports = connection;