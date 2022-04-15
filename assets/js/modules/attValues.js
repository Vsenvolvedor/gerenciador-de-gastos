import despesas from "./manager";

export default function attValues(){
  const 
    renda = document.querySelector('#rmen'),
    desp = document.querySelector('#desp'),
    rest = document.querySelector('#rest')

  
  desp.innerText = despesas
  rest.innerText = renda.value - despesas
}
