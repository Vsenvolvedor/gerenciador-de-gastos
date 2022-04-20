const fs = require('fs')

function deletNote(index,url){
  if(index && url) {
    const note = JSON.parse(fs.readFileSync(`../${url}.json`,'utf8'))
    const newNote = note.filter(item => item !== note[index])
    const json = JSON.stringify([...newNote])
 
    fs.writeFileSync(`../${url}.json`,json)
  }
}

module.exports = {deletNote}