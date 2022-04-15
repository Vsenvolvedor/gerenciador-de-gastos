
export default function attValues(despesas){
  const 
    renda = document.querySelector('#rmen'),
    desp = document.querySelector('#desp'),
    rest = document.querySelector('#rest')
  
  console.log(despesas)
  desp.innerText = despesas
  rest.innerText = renda.value - despesas
}



