const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser())

const index = require('./router/index')
const news = require('./router/news')
const headLines = require('./router/head-lines')
const complaints = require('./router/complaints')
const onlineQuestion = require('./router/online-question')
const login = require('./router/login')

app.use(index.routes(), index.allowedMethods()); // 首页
app.use(news.routes(), news.allowedMethods()); // 新闻
app.use(headLines.routes(), headLines.allowedMethods()); // 头条
app.use(complaints.routes(), complaints.allowedMethods()); // 投诉建议
app.use(onlineQuestion.routes(), onlineQuestion.allowedMethods()); // 搜索

// mock
app.use(login.routes(), login.allowedMethods()); // 搜索

app.listen(2000, () => {
  console.log('api-cjn server is starting at port 2000')
})