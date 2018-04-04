var fs = require("fs");
var path = require('path');
var uploadPath = path.resolve(__dirname, '..');//获取上级目录

exports.upload = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    console.log(req.files[0]);  // 上传的文件信息
    var des_file = uploadPath + "/public/upload/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                var response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
                res.end(JSON.stringify(response));
            }
        });
    });
}