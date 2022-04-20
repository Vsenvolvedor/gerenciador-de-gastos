const express = require('express')
const app = express()

app.use(express.static('public'))

app.post('/getjson', (req,res) => {
  console.log(res.body)
})

app.get('/values', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/values.json',{root:__dirname})

})

app.get('/note', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/note.json',{root:__dirname})
})

app.get('/manage', (req,res) => {
  res.type('application/json')
  res.sendFile('./db/manage.json',{root:__dirname})
})

app.listen(5000, err => {
  if(err) {
    console.log(err)
  } else {
    console.log('RODANDO')
  }
})