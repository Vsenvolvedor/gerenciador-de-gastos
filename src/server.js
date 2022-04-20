const {writeNote, writeCost, writeValues, writeCategs} = require('./controllers/addNewItem')
const {deletItem} = require('./controllers/removeItem')
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.get('/values', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/values.json',{root:__dirname})
})

app.post('/values', (req,res) => {
  
  if(req.body.renda) {
    const renda = req.body.renda
    const despesas = req.body.despesas
    const sobra = req.body.sobra
  
    writeValues(renda,despesas,sobra)
  } else if(req.body.categs) {
    writeCategs(req.body.categs)
  }

  res.send({
    ok: true
  })
})

app.get('/note', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/note.json',{root:__dirname})
})

app.post('/note', (req,res) => {
  const {titulo,descricao} = req.body
  
  writeNote(titulo,descricao)

  res.send({
    ok: true
  })
})

app.get('/manage', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/manage.json',{root:__dirname})
})

app.post('/manage', (req,res) => {
  const {nome,valor,tipo,categoria} = req.body
  writeCost(nome,valor,tipo,categoria)

  res.send({
    ok: true
  })
})

app.delete('/delet', (req,res) => {
  const {value,url} = req.body
  
  deletItem(value,url)
})

app.listen(5000, err => {
  if(err) {
    console.log(err)
  } else {
    console.log('RODANDO')
  }
})