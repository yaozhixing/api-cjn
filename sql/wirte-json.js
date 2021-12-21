const fs = require("fs")
const path = require("path")
const usersJson = path.join(__dirname, '../data/users.json')

// 写入
const writeJson = (data, callBack) => {
  const dataString = JSON.stringify(data);
  console.log("用户", dataString)
  fs.writeFile(usersJson, dataString, (err, data) => {
    if (err) return console.error(err);
    console.log('-------------注册成功----------------');
    callBack
  })
}

// 修改

module.exports = {
  writeJson
}