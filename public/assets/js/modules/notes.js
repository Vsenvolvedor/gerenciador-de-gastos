import {modal} from "../script.js"
import FetchItems from "./FetchItems.js"

class Notes {
  constructor(wrapper,form) {
    this.noteApi = new FetchItems('note')
    this.wrapper = document.querySelector(wrapper)
    this.form = document.querySelector(form)
    this.inputs = [...this.form].filter((item) => item.id === 'text' || item.id === 'title')
    this.btn = [...this.form].filter((item) => item.id === 'btn')[0]
  
    this.addElement = this.addElement.bind(this)
  }
  async addSaveNotes(){
    const json = await this.noteApi.initGet()
    json.forEach((item) => {
      const element = this.createElement(item.titulo,item.descricao)
      this.wrapper.innerHTML += element
    })
    this.deletEvent()
  }
  createElement(title,desc){
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
        <p>
          ${desc}
        </p>
    </div>
    `
    return element
  }
  deletEvent(){
    this.deletElements = document.querySelectorAll('.delet-note')
    this.addEventClick()
  }
  deletElement({target}){
    target.parentElement.parentElement.parentElement.remove()
  }
  addElement(){
    const [input1,input2] = this.inputs.map((input) => !(input.value === ''));
    if(input1 && input2){
      const element = this.createElement(this.form.elements.title.value,this.form.elements.text.value);
      this.wrapper.innerHTML += element;
      modal.toggleMenu()
      document.querySelector('body').style.overflowY = 'auto'
      this.deletEvent()
      this.inputs.forEach((input) => {
        input.value = ''    
      })
      this.noteApi.initPost(element)
    } else {
      this.inputs.forEach((input) => {
        if(input.value === ''){
          input.style.border = '2px solid #D25555'
          input.nextElementSibling.innerText = 'Não deixe o formulário em branco.'
        } else {
          input.style.border = ''
          input.nextElementSibling.innerText = ''
        }
      })
    }
  
  }
  addEventClick(){
    this.btn.addEventListener('click',this.addElement)
    if(this.deletElements){this.deletElements.forEach((element)=> element.addEventListener('click',this.deletElement))}
  }

  init(){
    this.addSaveNotes()
    if(this.wrapper && this.form){this.addEventClick();this.deletEvent()}
    return this
  }
}

const notes = new Notes('.note-wrapper','#note').init()
