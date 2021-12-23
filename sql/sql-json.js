const fs = require("fs")
const path = require("path")
const users = path.join(__dirname, '../json/users.json')

// 写入
const writeJson = async (data, callBack) => {
  const dataString = JSON.stringify(data);
  await write(users, dataString)
  callBack()
}

const write = async (table, dataString) => {
  try {
    await fs.writeFileSync(table, dataString)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  writeJson
}