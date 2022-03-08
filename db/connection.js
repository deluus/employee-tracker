const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rivals0!',
    database: 'employee_DB'
});

connection.connect(function(err) {
    if(err) throw err;
});

module.exports = connection;