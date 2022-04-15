import {modal, modal2} from "../script.js"

function manager() {
  
  const 
    wrapper = document.querySelector('.g-wrapper'),
    form = [...document.querySelector('#modal')],
    itemType = document.querySelectorAll('.type'),
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

  function createElement(){
    const element = `
    <div class="note">
    <div>
      <h3>
        ${formObj.name.value}
      </h3>
      <button class="delet-note">
        <img src="assets/images/delete.svg" alt="Deletar">
      </button>
    </div>
    <ul>
      <li>Valor: R$ <span>${formObj.price.value}</span> </li>
      <li>Tipo: <span>${formObj.type}</span></li>
      <li>Categoria: <span>${formObj.categ.value}</span> </li>
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
      const element = createElement()
      wrapper.innerHTML += element
      addDeletEvent()
      modal2.toggleMenu()
      document.querySelector('body').style.overflowY = 'auto'
      form.filter(item => item.name !== 'btn').forEach((item) => {
        item.value = ''
        item.style.border = ''
        item.name === 'type' ? item.labels[0].classList.remove(activeClass) : ''
      })
    } else {
      form.forEach((input) => {
        input.value === '' ? input.style.border = '2px solid #D25555':''
      })
      
    }
  }

  formObj.btn.addEventListener('click',addElement)
  itemType.forEach(item => item.addEventListener('click', (event) => {checkItem(event,itemType)}))
  
}

manager()