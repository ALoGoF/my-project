module.exports = (app) => {
  // 测试接口
  app.get('/test', (req, res, next) => {
    res.json({
      data: 'server-test'
    });
  })
}