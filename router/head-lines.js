const router = require('koa-router')();
const request = require('../request/request');

/**
 * 今日头条
 */

// 分类
router.get('/head-lines/category', async (ctx) => {
  ctx.body = await request({
    url: '/v1/settle/category/getList',
    method: 'GET'
  })
})

// 焦点图
router.get('/head-lines/banner', async (ctx) => {
  ctx.body = await request({
    url: '/v3/information/getInformationList?channelId=-1&sourceType=0&page=1&limit=1',
    method: 'GET'
  })
})

// 列表
router.get('/head-lines/list', async (ctx) => {
  const { page, limit } = ctx.query
  ctx.body = await request({
    url: `/v3/home/homeList?page=${page}&limit=${limit}&columnId=`,
    method: 'GET'
  })
})

module.exports = router