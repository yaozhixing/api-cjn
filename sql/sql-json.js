const fs = require("fs")
const path = require("path")
const jsonMap = {
  users: path.join(__dirname, '../json/users.json')
}

// 写入
const writeJson = (data, callBack) => {
  const dataString = JSON.stringify(data);
  fs.writeFile(jsonMap[data], dataString, (err, data) => {
    if (err) return console.error(err);
    callBack()
  })
}

module.exports = {
  writeJson
}