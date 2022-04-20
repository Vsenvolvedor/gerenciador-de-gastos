import FetchItems from './FetchItems.js';

const 
  renda = document.querySelector('#rmen'),
  desp = document.querySelector('#desp'),
  rest = document.querySelector('#rest'),
  note = document.querySelector('#addNote'),
  categs = document.querySelector('.categorias'),
  categArray = ['moradia','transporte','alimentacao','entreterimento','outros'],
  apiValues = new FetchItems('values'),
  apiNotes = new FetchItems('note')
  
async function loadItems(){
  const json = await apiValues.initGet();
  const {categorias} = json;
  const noteJson = await apiNotes.initGet();
 
  if(renda && desp && rest) {
    renda.innerText = json.renda;
    renda.value = json.renda;
    desp.innerText = json.despesas;
    rest.innerText = json.renda - json.despesas;
  }
  if(note && noteJson.length) {
    note.innerText = noteJson[noteJson.length - 1].descricao;
  }

  if(categs) {
    categs.innerHTML = categArray.map((categoria) => {
      return `<li>${categoria}: R$ ${categorias[categoria]}</li>`;
    })
    categs.innerHTML = categs.innerHTML.split(',').join('');
  }
}

function addItems(value){
  const despesas = value || value < 0 ? value : false;
  despesas ? desp.innerText = Number(desp.innerText) + despesas : null;
  rest.innerText = renda.value - despesas
  if(desp.innerText === 0 && renda.value === 0) {
    apiValues.initPost({renda:+renda.value,despesas,sobra:0});
  } else {
    apiValues.initPost({renda:+renda.value,despesas,sobra:renda.value - despesas});
  }
}

if(renda) {
  renda.addEventListener('change', async () => {
    const json = await apiValues.initGet();
    addItems(false);
    loadItems();
  })
}


export {loadItems,addItems};




