const router = require('koa-router')();
const request = require('../request/request');

// 分类
router.get('/news/category', async (ctx) => {
  ctx.body = await request({
    url: '/v1/channel/list',
    method: 'GET'
  })
})

// 推荐
router.get('/news/recommend', async (ctx) => {
  const { page, limit } = ctx.query
  ctx.body = await request({
    url: `/v3/home/homeList?page=${page}&limit=${limit}&columnId=`,
    method: 'GET'
  })
})

// 列表（除推荐）
router.get('/news/list', async (ctx) => {
  const { channelId, page, limit, columnId } = ctx.query
  ctx.body = await request({
    url: `/v3/information/getInformationList?sourceType=0&keyword=&channelId=${channelId}&page=${page}&limit=${limit}&columnId=${columnId}`,
    method: 'GET'
  })
})

// 详情
router.get('/news/detail', async (ctx) => {
  const { id } = ctx.query
  ctx.body = await request({
    url: `/v1/information/getDetail?informationId=${id}`,
    method: 'GET'
  })
})

// 搜索
router.get('/news/search', async (ctx) => {
  const { page, limit, keyword } = ctx.query;
  // 必须中文转码
  const keywordCode = encodeURI(keyword)
  ctx.body = await request({
    url: `/v3/home/search?page=${page}&limit=${limit}&keyword=${keywordCode}`,
    method: 'GET'
  })
})

// post test
router.post('/recommend/test', async (ctx) => {
  console.log('1111', ctx.request.body)
  ctx.body = {
    url: ctx.url,
    req_request: ctx.request.body,
  }
})

module.exports = router