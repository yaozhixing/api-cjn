const router = require('koa-router')();
const request = require('../request/request');

/**
 * 在线问答
 */

// 列表
router.get('/online-question/list', async (ctx) => {
  const { page, limit, keyword } = ctx.query;
  ctx.body = await request({
    url: `/v1/themeonline/getList?page=${page}&limit=${limit}&keyword=${keyword}`,
    method: 'POST'
  })
})

// 详情
router.get('/online-question/detail', async (ctx) => {
  const { id } = ctx.query;
  ctx.body = await request({
    url: `/v1/themeonline/getDetail?informationId=${id}`,
    method: 'POST'
  })
})

// 评论列表
router.get('/online-question/comment/list', async (ctx) => {
  const { id, page, limit } = ctx.query;
  ctx.body = await request({
    url: `/v1/themeQuestion/query?parentInfoId=${id}&page=${page}&limit=${limit}&timeOrder=1&keyword=&ifLookMe=0`,
    method: 'GET'
  })
})

// 评论详情
router.get('/online-question/comment/detail', async (ctx) => {
  const { id } = ctx.query;
  ctx.body = await request({
    url: `/v1/themeQuestion/detail?questionId=${id}`,
    method: 'POST'
  })
})

module.exports = router