
export default function attValues(despesas){
  const 
    renda = document.querySelector('#rmen'),
    desp = document.querySelector('#desp'),
    rest = document.querySelector('#rest')
  
  if(despesas){
    desp.innerText = despesas
    rest.innerText = renda.value - despesas
  }

}



