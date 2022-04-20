const { DataController} = require('./controller/DataController');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/values', (req,res) => {
  res.type('application/json');
  res.sendFile('./db/values.json',{root:__dirname});
});

app.post('/values', (req,res) => {
 
  if(req.body.renda || req.body.renda === 0) {
    const {renda,despesas,sobra} = req.body;
    DataController.writeValues(renda,despesas,sobra);
  } else if(req.body.categs) {
    DataController.writeCategs(req.body.categs);
   
  }

  res.send({
    ok: true
  })
});

app.get('/note', (req,res) => {
  res.type('application/json');
  res.sendFile('./db/note.json',{root:__dirname});
});

app.post('/note', (req,res) => {
  const {titulo,descricao} = req.body;
  
  DataController.writeNote(titulo,descricao);

  res.send({
    ok: true
  })
});

app.get('/manage', (req,res) => {
  res.type('application/json');
  res.sendFile('./db/manage.json',{root:__dirname});
});

app.post('/manage', (req,res) => {
  const {nome,valor,tipo,categoria} = req.body;
  DataController.writeCost(nome,valor,tipo,categoria);

  res.send({
    ok: true
  });
});

app.delete('/delet', (req,res) => {
  const {value,url} = req.body;
  DataController.deletItem(value,url);
  res.send({
    ok: true
  });
});

app.listen(5000, err => {
  if(err) {
    console.log(err);
  } else {
    console.log('RODANDO');
  }
});