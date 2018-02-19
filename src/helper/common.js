export default {
  jsonData(code=0, data, msg='ok'){
    let obj = {
      code: code,
      data: data,
      message: msg
    }
    switch(code){
      // 成功success
      case 0:
      obj.message = 'ok'
      break;

      // 未知错误
      case -1:
      obj.message = 'something wrong'
      break;

      // 用户名或者密码错误
      case 15:
      obj.message = '用户名或密码错误'
      break;

      // 登陆超时
      case 16:
      obj.message = '登陆超时'
      break;

      // 未登录
      case 9:
      obj.message = 'token失效'
      break;

      // 没有权限
      case 20:
      obj.message = '您当前没有权限'
    }
    return obj
  }
}
