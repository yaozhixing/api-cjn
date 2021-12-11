const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = 'index2个'
})

module.exports = router