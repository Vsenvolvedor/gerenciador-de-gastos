const fs = require('fs')

function writeNote(titulo,descricao){
  const note = JSON.parse(fs.readFileSync('../note.json','utf8'))
  const json = JSON.stringify([...note,{
    titulo,
    descricao
  }])
 
  fs.writeFileSync('../note.json',json)
}

function writeCost(nome,valor,tipo,categoria){
  const note = JSON.parse(fs.readFileSync('../manage.json','utf8'))
  const json = JSON.stringify([...note,{
    nome,
    valor,
    tipo,
    categoria
  }])
 
  fs.writeFileSync('../manage.json',json)
}


function writeValues(renda,despesas,sobra){
  const note = JSON.parse(fs.readFileSync('../values.json','utf8'))

  renda ? note.renda = renda : ''
  despesas ? note.despesas = despesas : ''
  sobra ? note.sobra = sobra : ''

  const json = JSON.stringify(note)
  fs.writeFileSync('../values.json',json)
}

function writeCategs(categs) {
  const note = JSON.parse(fs.readFileSync('../values.json','utf8'))
  const {categorias} = note
  const categArray = ['moradia','transporte','alimentacao','entreterimento','outros']
  categArray.forEach((item, index) => {
    if(categs[index]) {
      categorias[item] = categs[index]
    }
  })

  note.categorias = categorias
  const json = JSON.stringify(note)
  fs.writeFileSync('../values.json',json)
}


module.exports = {
  writeNote,
  writeCost,
  writeValues,
  writeCategs
}