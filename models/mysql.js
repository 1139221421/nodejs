var mysql = require('mysql');
exports.getConn = function () {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test'
    });
    return connection;
}


