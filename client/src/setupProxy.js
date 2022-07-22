const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5001', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, 
    })
  )
}