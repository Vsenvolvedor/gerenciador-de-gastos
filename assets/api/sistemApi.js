const fs = require('fs')

function writeNote(titulo,descricao){
  const note = JSON.parse(fs.readFileSync('./assets/api/note.json','utf8'))
  const json = JSON.stringify([...note,{
    titulo,
    descricao
  }])
 
  fs.writeFileSync('./assets/api/note.json',json)
}

function deletNote(index){
  const note = JSON.parse(fs.readFileSync('./assets/api/note.json','utf8'))
  const newNote = note.filter(item => item !== note[index])
  const json = JSON.stringify([...newNote])
 
  fs.writeFileSync('./assets/api/note.json',json)
}

module.exports = {
  writeNote,
  deletNote
}