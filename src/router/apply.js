import express from 'express'
import { ApplyCard } from '../model/apply'
import { User } from '../model/user'
import common from '../helper/common'
import exports from '../helper/token'
import qiniu from 'qiniu'
var fs = require('fs')
// 七牛
var accessKey = '8jJUF6mq47xfqw-_CWY-J0HVQfYLFEbIhJ4HCwLs';
var secretKey = 'A39_pYWEhyXZSOCVpLetD6cT0sUinKHxFF01wivf';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
var options = {
  scope: 'zooey-store',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

const router = express.Router()
// middleWare 中间件解决post提交的请求参数反馈
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
router.get('/', (req, res) => {
  res.send('/apply/')
})
router.get('/card/create', async(req, res) => {
  const { title } = req.query;
  const item = {
    uid: 1,
    cardId: 101,
    cardName: title,
  };
  await ApplyCard.create(item)
  res.send(item)
})
// card 显示图标
router.get('/card', async(req, res) => {
	let query = req.query
	// exports.decodeToken(query.token)
  const data = await ApplyCard.all() //findAll
  for (const row of data) {
    row.dtt = row.createdAt.toString();
  }
	if(exports.checkToken(query.token)){
		res.send(common.jsonData(0, data))
	}else {
		res.send(common.jsonData(9, 'undefined'))
	}
})
// 上传
router.post('/fileUpload', async(req, res)=> {
  let param = req.body
  var f = fs.createReadStream(param.files)
  // var config = new qiniu.conf.Config();
  // config.zone = qiniu.zone.Zone_z2
  // // 是否使用https域名
  // //config.useHttpsDomain = true;
  // // 上传是否使用cdn加速
  // //config.useCdnDomain = true;
  // var localFile = "C:/Users/张应颖/Pictures/Camera Roll/assert/luyou.png"
  // var formUploader = new qiniu.form_up.FormUploader(config);
  // var putExtra = new qiniu.form_up.PutExtra();
  // var key = "luyou.png"
  // formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
  //   respBody, respInfo) {
  //   if (respErr) {
  //     throw respErr;
  //     res.end()
  //   }
  //   if (respInfo.statusCode == 200) {
  //     console.log(respBody);
  //     res.send(respBody)
  //   } else {
  //     console.log(respInfo.statusCode);
  //     console.log(respBody);
      res.send(f)
  //   }
  // })
})

// 登陆
router.post('/login', multipartMiddleware, async(req, res) => {
  let query = req.body
  let user = await User.all({
    where: {
      user: query.user
    }
  })
	if(user.length<1){
		res.status(403).end()
	}
  for (let a of user) {
    if (query.password == a.password) {

			let dataok = common.jsonData(0, exports.createToken(query, 3600))
      res.send(dataok)
    } else {
			let data = common.jsonData(15, {data: uploadToken})
      res.send(data)
    }
  }
})
// 注册数据
router.post('/register', multipartMiddleware, async(req, res) => {
  let query = req.body
  await User.create(query)
  let user = await User.all({
    where: {
      user: query.user
    }
  })
  for (let a of user) {
    if (query.user == a.user) {
      res.status(200).json(common.jsonData(-1, {data: 'undefined'}))
    } else {
      await res.json(common.jsonData(0, {data: 'insert ok'}))
    }
  }
})

export default router;
