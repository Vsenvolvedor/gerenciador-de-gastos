import {modal} from "../script.js"
import FetchItems from "./FetchItems.js"

class Notes {
  constructor(wrapper, form) {
    this.noteApi = new FetchItems('note');
    this.wrapper = document.querySelector(wrapper);
    this.form = document.querySelector(form);
    this.inputs = [...this.form].filter((item) => item.id === 'text' || item.id === 'title');
    this.btn = [...this.form].filter((item) => item.id === 'btn')[0];

  }
  async addSaveNotes(){
    const json = await this.noteApi.initGet();
    json.forEach( (item) => {
      const element = this.createElement(item.titulo, item.descricao);
      this.wrapper.innerHTML += element;
    });
    this.deletEvent();
  }
  createElement(title, desc) {
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
    return element;
  }
  deletEvent() {
    this.deletElements = document.querySelectorAll('.delet-note');
    this.addEventClick();
  }
  deletElement( {target} ) {
    const elements = [...this.wrapper.querySelectorAll('.note')];
    const{element,index} = elements.reduce( (acc,element,index) => {
      element.contains(target) ? acc =  {element,index} : null;
      return acc
    },0);

    if(element && (index || index === 0)) {
      // Remove o elemento do DOM
      element.remove();
      // Remove do servidor
      this.noteApi.initDelet(index);
    }   
  }
  initFetchs(title,text) {
    this.noteApi.initPost({titulo:title.value,descricao:text.value});
  }
  addElement(){
    const [input1,input2] = this.inputs.map((input) => !(input.value === ''));

    if(input1 && input2) {
      const {title,text} = this.form.elements
      // Criar elemento
      const element = this.createElement(title.value,text.value);
      // Adicionar ao DOM
      this.wrapper.innerHTML += element;
      // Limpar inputs
      this.inputs.forEach(( {value} ) => value = '');
      // Fechar modal e ativar scroll
      modal.toggleMenu();
      document.querySelector('body').style.overflowY = 'auto';
      // Enviar elemento para o server 
      this.initFetchs(title,text);
      // Adicionar evento de deletar
      this.deletEvent();
    } else {
      this.inputs.forEach((input) => {
        // Verificar se todos os inputs estão preenchidos
        if(input.value === '') {
          input.style.border = '2px solid #D25555';
          input.nextElementSibling.innerText = 'Não deixe o formulário em branco.';
        } else {
          input.style.border = '';
          input.nextElementSibling.innerText = '';
        }
      })
    }
  
  }
  addEventClick(){
    // Adicionar eventos de clique
    this.btn.addEventListener('click',this.addElement);
    if(this.deletElements){this.deletElements.forEach((element)=> element.addEventListener('click',(e) => this.deletElement(e)))};
  }
  setBind() {
    this.addElement = this.addElement.bind(this);
    this.deletElement = this.deletElement.bind(this);
  }
  init(){
    this.setBind();
    this.addSaveNotes();
    if(this.wrapper && this.form) {
      this.addEventClick();
      this.deletEvent();
    };
 
    return this
  }
}

const notes = new Notes('.note-wrapper','#note').init()
