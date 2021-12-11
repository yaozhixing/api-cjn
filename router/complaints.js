const router = require('koa-router')();
const request = require('../request/request');

/**
 * 投诉建议
 */

router.get('/complaints', (ctx, next) => {
  ctx.body = {
    url: ctx.url,
    req_request: ctx.request,
    req_requestString: ctx.query,
  }
})

module.exports = router