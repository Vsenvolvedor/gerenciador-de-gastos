const {writeNote, writeCost, writeValues, writeCategs} = require('./controllers/addNewItem')
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.get('/values', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/values.json',{root:__dirname})
})

app.post('/values', (req,res) => {
  const renda = req.body.renda
  const despesas = req.body.despesas
  const sobra = req.body.sobra

  writeValues(renda,despesas,sobra)
  res.send({
    ok: true
  })
})

app.get('/note', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/note.json',{root:__dirname})
})

app.post('/note', (req,res) => {
  const titulo = req.body.titulo
  const descricao = req.body.descricao
  
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
  const nome = req.body.nome
  const valor = req.body.valor
  const tipo = req.body.tipo
  const categoria = req.body.categoria
  writeCost(nome,valor,tipo,categoria)

  res.send({
    ok: true
  })
})

app.listen(5000, err => {
  if(err) {
    console.log(err)
  } else {
    console.log('RODANDO')
  }
})