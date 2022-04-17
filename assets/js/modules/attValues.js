import FetchItems from './fetchItems.js'

const 
  renda = document.querySelector('#rmen'),
  desp = document.querySelector('#desp'),
  rest = document.querySelector('#rest'),
  note = document.querySelector('#addNote'),
  apiValues = new FetchItems('values.json'),
  apiNotes = new FetchItems('note.json')
  
async function loadItems(){
  const json = await apiValues.initFetch()
  const noteJson = await apiNotes.initFetch()
  if(renda && desp && rest) {
    renda.innerText = json.renda
    renda.value = json.renda
    desp.innerText = json.despesas
    rest.innerText = json.sobra
  }
  if(note) {
    note.innerText = noteJson[noteJson.length - 1].descricao
  }
}

function addItems(despesas){
  desp.innerText = despesas
  rest.innerText = renda.value - despesas
}

export {loadItems,addItems}




