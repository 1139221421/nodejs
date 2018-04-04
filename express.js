//使用 Express 框架搭建web服务
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require("fs"),
    multer = require('multer'),
    cookieParser = require('cookie-parser'),
    util = require('util'),
    user = require("./routes/user"),
    session = require("express-session"),
    upload = require("./routes/upload");

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false})
var app = express();
app.use('/', express.static(__dirname + '/views'));
app.use('/', express.static(__dirname + '/public')); // express.static 中间件来设置静态文件路径 app.use(express.static('public'));
app.use(multer({dest: '/tmp/'}).array('image'));
app.use(cookieParser());
app.use(session({
    secret: 'this is the secret for cookie',
    resave: false,
    saveUninitialized: true
}));

Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}
var backArr = new Array();
backArr.push("/login.html");
backArr.push("/login.do");

app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (!backArr.contains(url) && undefined == req.session.user) {
        console.log("No authority!")
        return;
    }
    next();
});


app.post('/login.do', bodyParser.json(), user.login);
app.get('/users.do', user.getUsers);
app.post('/adduser.do', urlencodedParser, user.addUser);
//文件上传
app.post('/upload.do', upload.upload);
app.get('/cookie', function (req, res) {
    console.log("Cookies: " + util.inspect(req.cookies));
})

//app.use是express“调用中间件的方法”,就是处理HTTP请求的函数
app.use("/index", function (req, res) {
    res.send("index");
});

//处理get请求 也可以是'/ab*cd'正则表达式
app.get('/index1.html', function (req, res) {
    res.sendfile("views/index.html");//页面跳转
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log(" http://%s:%s", host, port)

})

// Request
// req.app：当callback为外部文件时，用req.app访问express的实例
// req.baseUrl：获取路由当前安装的URL路径
// req.body / req.cookies：获得「请求主体」/ Cookies
// req.fresh / req.stale：判断请求是否还「新鲜」
// req.hostname / req.ip：获取主机名和IP地址
// req.originalUrl：获取原始请求URL
// req.params：获取路由的parameters
// req.path：获取请求路径
// req.protocol：获取协议类型
// req.query：获取URL的查询参数串
// req.route：获取当前匹配的路由
// req.subdomains：获取子域名
// req.accepts()：检查可接受的请求的文档类型
// req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
// req.get()：获取指定的HTTP请求头
// req.is()：判断请求头Content-Type的MIME类型

// Response 对象
// res.app：同req.app一样
// res.append()：追加指定HTTP头
// res.set()在res.append()后将重置之前设置的头
// res.cookie(name，value [，option])：设置Cookie
// opition: domain / expires / httpOnly / maxAge / path / secure / signed
// res.clearCookie()：清除Cookie
// res.download()：传送指定路径的文件
// res.get()：返回指定的HTTP头
// res.json()：传送JSON响应
// res.jsonp()：传送JSONP响应
// res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
// res.redirect()：设置响应的Location HTTP头，并且设置状态码302
// res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
// res.send()：传送HTTP响应
// res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
// res.set()：设置HTTP头，传入object可以一次设置多个头
// res.status()：设置HTTP状态码
// res.type()：设置Content-Type的MIME类型
