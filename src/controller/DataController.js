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
    const cost = JSON.parse(fs.readFileSync(`${dbPath}/db/manage.json`,'utf8'))
 
    const json = JSON.stringify([...cost,{
      nome,
      valor,
      tipo,
      categoria
    }])
   
    fs.writeFileSync(`${dbPath}/db/manage.json`,json)
  }
  
  static writeValues(renda,despesas,sobra){
    const values = JSON.parse(fs.readFileSync(`${dbPath}/db/values.json`,'utf8'))
  
    renda || renda === 0 ? values.renda = renda : ''
    despesas ? values.despesas += despesas : ''
    sobra ? values.sobra = sobra : ''
  
    const json = JSON.stringify(values)
    fs.writeFileSync(`${dbPath}/db/values.json`,json)
  }
  
  static writeCategs(categs) {
    const valuesCateg = JSON.parse(fs.readFileSync(`${dbPath}/db/values.json`,'utf8'))
    const {categorias} = valuesCateg
    const categArray = ['moradia','transporte','alimentacao','entreterimento','outros']
    categArray.forEach((item) => {
      if(categs[item]) {
        categorias[item] += categs[item]
      }
    })
  
    valuesCateg.categorias = categorias
    const json = JSON.stringify(valuesCateg)
    fs.writeFileSync(`${dbPath}/db/values.json`,json)
  }
  static deletItem(index,url){
    const item = JSON.parse(fs.readFileSync(`${dbPath}/db/${url}.json`,'utf8'));
    const newItem = item.filter(i => i !== item[index]);
    const json = JSON.stringify([...newItem]);
    fs.writeFileSync(`${dbPath}/db/${url}.json`,json);
  }
  static resetItems() {
    const json = JSON.stringify([])
    const valuesJson = JSON.stringify({
      renda:0,
      despesas:0,
      sobra:0,
      categorias:{
        moradia:0,
        transporte:0,
        alimentacao:0,
        entreterimento:0,
        outros:0
      }
    })
   
    fs.writeFileSync(`${dbPath}/db/note.json`,json);
    fs.writeFileSync(`${dbPath}/db/manage.json`,json);
    fs.writeFileSync(`${dbPath}/db/values.json`,valuesJson)
  }
};


module.exports = {DataController};