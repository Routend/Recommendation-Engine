var mysql = require('mysql');


var connection = mysql.createConnection({
  host: '107.170.226.9';
  port: '3306';
  user: 'mike',
  password: 'routend',
  database: 'routend'
});

connection.connect();

module.exports = connection;