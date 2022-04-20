const fs = require('fs')
const path = require('path')
const dbPath = path.dirname(__dirname)

function deletItem(index,url){
  const item = JSON.parse(fs.readFileSync(`${dbPath}/db/${url}.json`,'utf8'))
  const newItem = item.filter(i => i !== item[index])
  const json = JSON.stringify([...newItem])
  fs.writeFileSync(`${dbPath}/db/${url}.json`,json)
}

module.exports = {deletItem}