var mysql = require("../models/mysql");

exports.getUsers = function (req, res) {
    var connection = mysql.getConn();
    var sql = 'SELECT * FROM user';
    connection.query(sql, function (err, results) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.send(results);
    });
    connection.end();
}
exports.addUser = function (req, res) {
    var connection = mysql.getConn();
    var sql = 'INSERT INTO user(user_name,password) VALUES(?,?)';
    var params = [req.body.userName, req.body.password];
    connection.query(sql, params, function (err, results) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log(results);
        res.send(results);
    });
    connection.end();
}

exports.login = function (req, res) {
    var connection = mysql.getConn();
    var sql = 'select * from user where user_name = ? and password = ?';
    var params = [req.body.userName, req.body.password];
    if (undefined == req.session.user) {
        connection.query(sql, params, function (err, results) {
            if (err) {
                console.log('[ERROR] - ', err.message);
                return;
            }
            console.log(results);
            if (results.length > 0) {
                req.session.user = results;
                res.send(results);
            } else {
                res.send("null");
            }
        })
    } else {
        console.log(req.session.user)
        console.log("已登录")
    }


}

