const fs = require('fs')

function writeNote(titulo,descricao){
  const note = JSON.parse(fs.readFileSync('./assets/api/note.json','utf8'))
  const json = JSON.stringify([...note,{
    titulo,
    descricao
  }])
 
  fs.writeFileSync('../note.json',json)
}

writeNote('Titulo 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at placerat lacus, non convallis orci. Duis vel aliquam urna. Sed ullamcorper nunc porttitor, condimentum nisi quis, varius arcu. Sed sagittis mollis varius.')

function writeCost(titulo,descricao){
  const note = JSON.parse(fs.readFileSync('./assets/api/note.json','utf8'))
  const json = JSON.stringify([...note,{
    titulo,
    descricao
  }])
 
  fs.writeFileSync('../manager.json',json)
}

function writeValues(titulo,descricao){
  const note = JSON.parse(fs.readFileSync('./assets/api/note.json','utf8'))
  const json = JSON.stringify([...note,{
    titulo,
    descricao
  }])
 
  fs.writeFileSync('../values.json',json)
}

module.exports = {
  writeNote,
  writeCost,
  writeValues
}