import {modal2} from "../script.js"

class Manager {
  constructor(wrapper,form){
    this.wrapper = document.querySelector(wrapper)
    this.form = document.querySelector(form)
    this.inputs = [...this.form].filter((item) => item.id === 'text' || item.id === 'title')
    this.btn = [...this.form].filter((item) => item.id === 'btn')[0]
    this.addElement = this.addElement.bind(this)
  }
  createElement(){
    const element = `
    <div class="note">
      <div>
        <h3>
         ${this.form.name.value}
        </h3>
        <button class="delet-note">
          <img src="assets/images/delete.svg" alt="Deletar">
        </button>
      </div>
      <ul>
        <li>Valor: R$ ${this.form.price.value} </li>
        <li>Tipo: ${this.form.type.value}</li>
        <li>Categoria: ${this.form.categ.value} </li>
        <li>Pago? ${this.form.check.value} </li>
      </ul>
    </div>
  `
    return element
  }
  deletEvent(){
    this.deletElements = document.querySelectorAll('.delet-note');
    this.addEventClick();
  }
  deletElement({target}){
    target.parentElement.parentElement.parentElement.remove();
  }
  addElement(){
    const element = this.createElement();
    this.wrapper.innerHTML += element;
    modal2.toggleMenu()
    document.querySelector('body').style.overflowY = 'auto'
    this.deletEvent();
  }
  
  addEventClick(){
    this.btn.addEventListener('click',this.addElement)
    if(this.deletElements){this.deletElements.forEach((element)=> element.addEventListener('click',this.deletElement))}
  }

  init(){
    if(this.wrapper && this.form){this.addEventClick();this.deletEvent()}
    return this
  }
}

const manager = new Manager('.g-wrapper','#modal').init()
