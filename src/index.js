// 启动项目的入口文件
import express from 'express'
import routers from './router/_index'
import './helper/extend'

const app = express()
// post 请求参数的可见性
var bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// 跨域设置
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 处理404错误
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
app.get('/', (req, res)=> {
	res.send('this is my first express app')
})
app.use('/apply', routers.apply)
// 监听端口号
app.listen(3000, ()=> {
	console.log('server start')
})
