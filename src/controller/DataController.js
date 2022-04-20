const fs = require('fs')
const path = require('path')
const dbPath = path.dirname(__dirname)

class DataController {
  static writeNote(titulo,descricao){
    const note = JSON.parse(fs.readFileSync(`${dbPath}/db/note.json`,'utf8'))
    const json = JSON.stringify([...note,{
      titulo,
      descricao
    }])
   
    fs.writeFileSync(`${dbPath}/db/note.json`,json);
  }
  static writeCost(nome,valor,tipo,categoria){
    const note = JSON.parse(fs.readFileSync(`${dbPath}/db/manage.json`,'utf8'))
 
    const json = JSON.stringify([...note,{
      nome,
      valor,
      tipo,
      categoria
    }])
   
    fs.writeFileSync(`${dbPath}/db/manage.json`,json)
  }
  
  static writeValues(renda,despesas,sobra){
    const note = JSON.parse(fs.readFileSync(`${dbPath}/db/values.json`,'utf8'))
  
    renda || renda === 0 ? note.renda = renda : ''
    despesas ? note.despesas += despesas : ''
    sobra ? note.sobra = sobra : ''
  
    const json = JSON.stringify(note)
    fs.writeFileSync(`${dbPath}/db/values.json`,json)
  }
  
  static writeCategs(categs) {
    const note = JSON.parse(fs.readFileSync(`${dbPath}/db/values.json`,'utf8'))
    const {categorias} = note
    const categArray = ['moradia','transporte','alimentacao','entreterimento','outros']
    categArray.forEach((item) => {
      if(categs[item]) {
        categorias[item] += categs[item]
      }
    })
  
    note.categorias = categorias
    const json = JSON.stringify(note)
    fs.writeFileSync(`${dbPath}/db/values.json`,json)
  }
  static deletItem(index,url){
    const item = JSON.parse(fs.readFileSync(`${dbPath}/db/${url}.json`,'utf8'));
    const newItem = item.filter(i => i !== item[index]);
    const json = JSON.stringify([...newItem]);
    fs.writeFileSync(`${dbPath}/db/${url}.json`,json);
  }
};

module.exports = {DataController};