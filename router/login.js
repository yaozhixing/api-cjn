const router = require('koa-router')();
const users = require("../data/users"); // 用户
const { writeJson } = require("../sql/sql-json") // 写去json

/**
 * 登录
 */
router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body // use
  // 是否存在
  const isExist = users.some((item) => item.email === email)
  if (!isExist) {
    ctx.body = {
      status: "E0001",
      message: "邮箱未注册",
      result: true
    }
    return
  }

  // 存在 => 是否邮箱密码正确
  const isUserStatus = users.some((item) => item.email === email && item.password === password)
  if (isUserStatus) {
    ctx.body = {
      status: "C0000",
      message: "登录成功",
      result: {
        email,
        password
      }
    }
  } else {
    ctx.body = {
      status: "E0002",
      message: "账户密码不正确",
      result: true
    }
  }
})

/**
 * 注册
 */
router.post('/register', async (ctx) => {
  const { email, password } = ctx.request.body // use
  // 是否存在
  const isExist = users.some((item) => item.email === email)
  if (isExist) {
    ctx.body = {
      status: "E0003",
      message: "邮箱已注册",
      result: true
    }
    return
  }

  // 不存在 => 注册
  const lastId = Number(users[users.length - 1].id)
  const newUserData = Object.assign({}, {
    id: lastId + 1,
    email,
    password
  })
  users.push(newUserData)

  // sql写入json
  writeJson(users, () => {
    ctx.body = {
      status: "C0000",
      message: "注册成功",
      result: {
        email,
        password
      }
    }
  })
})


/**
 * 忘记密码
 */
router.post('/forgerPassword', async (ctx) => {
  const { email } = ctx.request.body // use
  // 是否存在
  const isExist = users.some((item) => item.email === email)
  if (!isExist) {
    ctx.body = {
      status: "E0002",
      message: "邮箱未注册",
      result: true
    }
    return
  }

  const currUser = users.find((item) => item.email === email)
  ctx.body = {
    status: "C0000",
    message: "成功",
    result: currUser
  }
})

/**
 * 重置密码
 */
router.post('/resetPassword', async (ctx) => {
  const { email, password } = ctx.request.body // use
  // 是否存在
  const isExist = users.some((item) => item.email === email)
  if (!isExist) {
    ctx.body = {
      status: "E0002",
      message: "邮箱未注册",
      result: true
    }
    return
  }

  const index = users.findIndex((item) => item.email === email)
  users[index].password = password
  writeJson(users, () => {
    ctx.body = {
      status: "C0000",
      message: "重置成功",
      result: {
        email,
        password
      }
    }
  })
})

module.exports = router