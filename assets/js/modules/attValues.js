import FetchItems from './fetchItems.js'

const 
  renda = document.querySelector('#rmen'),
  desp = document.querySelector('#desp'),
  rest = document.querySelector('#rest'),
  apiValues = new FetchItems('values.json')
  
async function loadItems(){
  const json = await apiValues.initFetch()
  renda.value = json.renda
  desp.innerText = json.despesas
  rest.innerText = json.sobra
}

function addItems(despesas){
  desp.innerText = despesas
  rest.innerText = renda.value - despesas
}

export {loadItems,addItems}




