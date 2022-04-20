import {modal2} from "../script.js"
import {addItems,loadItems} from "./attValues.js"
import FetchItems from "./fetchItems.js"

let despesas = null

function manager() {
  
  const 
    wrapper = document.querySelector('.g-wrapper'),
    form = [...document.querySelector('#modal')],
    itemType = document.querySelectorAll('.type'),
    fetchItem = new FetchItems('manage'),
    activeClass = 'active',
    formObj = {}
    form.forEach((item) => {
      formObj[item.name] = item
    })
  

  function checkItem({target},items){
    items.forEach((item) => item.classList.remove(activeClass))
    if(target){
      target.classList.add(activeClass)
      formObj.type = target.htmlFor
    }
  
  }

  function deletElement({target}){
    target.parentElement.parentElement.parentElement.remove()
  }

  function addDeletEvent(){
    const deletElements = document.querySelectorAll('.delet-note')
    deletElements.forEach(element => element.addEventListener('click',deletElement))
  }

  function createElement(title,price,type,categ){
    const element = `
    <div class="note">
    <div>
      <h3>
        ${title}
      </h3>
      <button class="delet-note">
        <img src="assets/images/delete.svg" alt="Deletar">
      </button>
    </div>
    <ul>
      <li>Valor: R$ <span>${price}</span> </li>
      <li>Tipo: <span>${type}</span></li>
      <li>Categoria: <span>${categ}</span> </li>
    </ul>
    </div>
    `
    return element
  }

  function validateInputs(){
    let checkName = false
    const valid = form.filter(item => item.name !== 'btn').map((item) => {
      if(item.name === 'type' && item.labels[0].classList.contains(activeClass)){
        
        checkName = true
        return true    
      }
      else if(checkName && !item.labels[0].classList.contains(activeClass)){return true}
      else if(item.value && item.name !== 'type'){
        return true
      }
      else{
        return false
      }
    })
    if(checkName) valid[2] = true

    return valid.every(item => !!item)
  }

  function addElement(){
    const validate = validateInputs()
    if(validate){
      const element = createElement(formObj.name.value,formObj.price.value,formObj.type,formObj.categ.value)
      wrapper.innerHTML += element
      addDeletEvent()
      modal2.toggleMenu()
      document.querySelector('body').style.overflowY = 'auto'
      form.filter(item => item.name !== 'btn').forEach((item) => {
        item.name === 'price' ? despesas += +item.value :''
        item.value = ''
        item.style.border = ''
        item.name === 'type' ? item.labels[0].classList.remove(activeClass) : ''
      })
      addItems(despesas)
    } else {
      form.forEach((input) => {
        input.value === '' ? input.style.border = '2px solid #D25555':''
      })
      
    }
  }

  async function loadInfo() {
    const json = await fetchItem.initFetch()
    json.forEach(({nome,tipo,valor,categoria}) => {
      const element = createElement(nome,valor,tipo,categoria)
      wrapper.innerHTML += element
    })
    addDeletEvent()
  }

  loadItems()
  loadInfo()

  formObj.btn.addEventListener('click',addElement)
  itemType.forEach(item => item.addEventListener('click', (event) => {checkItem(event,itemType)}))
   
}

manager()


