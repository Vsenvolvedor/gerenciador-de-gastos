import {modal2} from "../script.js";
import {addItems,loadItems} from "./attValues.js";
import FetchItems from "./fetchItems.js";

class Manager {
  constructor() {
    this.wrapper = document.querySelector('.g-wrapper');
    this.form = [...document.querySelector('#modal')];
    this.itemType = document.querySelectorAll('.type');
    this.activeClass = 'active';
    this.formObj = {};
    this.form.forEach((item) => {
      this.formObj[item.name] = item;
    });
    this.fetchItem = new FetchItems('manage');
    this.fetchValue = new FetchItems('values');
    this.despesas = null
  }
  checkItem( {target} , items){
    items.forEach((item) => item.classList.remove(this.activeClass));
    
    if(target) {
      target.classList.add(this.activeClass);
      this.formObj.type = target.htmlFor;
    }
  }
  deletElement(target) {
    const elements = [...this.wrapper.querySelectorAll('.note')]
    const {element,price,categ,index} = elements.reduce(( acc, element, index) => {
      const price = element.querySelector('#price');
      const categ = element.querySelector('#catego');
      if(element.contains(target)) {
        acc = {
          element,
          price:+price.innerText,
          categ:categ.innerText,
          index
        };
      } 
      return acc;
    },0)

    if(element && (index || index === 0)) {
      element.remove();
      addItems(-price);
      this.fetchItem.initDelet(index);
      this.fetchValue.initPost( {categs:{ [categ]:-price } });
      addItems(false);
      loadItems();
    } 
    
  }
  addDeletEvent(){
    const deletElements = document.querySelectorAll('.delet-note');
    deletElements.forEach(element => element.addEventListener('click', ({target}) => this.deletElement(target)));
  }
  createElement(title,price,type,categ){
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
      <li>Valor: R$ <span id="price">${price}</span> </li>
      <li>Tipo: <span>${type}</span></li>
      <li>Categoria: <span id="catego">${categ}</span> </li>
    </ul>
    </div>
    `
    return element;
  }

  validateInputs(){
    let checkName = false;
    const formFilter = this.form.filter(item => item.name !== 'btn');
    const valid = formFilter.map( (item) => {
      if(item.name === 'type' && item.labels[0].classList.contains(this.activeClass)){
        checkName = true;
        return true;
      }
      else if(checkName && !item.labels[0].classList.contains(this.activeClass)) return true
      else if(item.value && item.name !== 'type') return true
      else return false;

    })
    if(checkName) valid[2] = true

    return valid.every(item => !!item);
  }
  initFetchs(name,price,type,categ) {
    this.fetchItem.initPost({nome:name.value,valor:price.value,tipo:type,categoria:categ.value});
    this.fetchValue.initPost({categs:{[categ.value]:+price.value}});
    this.despesas = +price.value;
    addItems(this.despesas);
    this.despesas = 0;
  }

  addElement(){
    const validate = this.validateInputs()
    if(validate){
      const {name,price,type,categ} = this.formObj;
      // Cria o elemento e adiciona ao DOM
      const element = this.createElement(name.value,price.value,type,categ.value);
      this.wrapper.innerHTML += element;
      // Fecha modal
      modal2.toggleMenu();
      document.querySelector('body').style.overflowY = 'auto';
      // Adiciona evento de deletar
      this.addDeletEvent();
      // Envia os dados ao servidor
      this.initFetchs(name,price,type,categ);
      // Limpa os inputs
      this.form.filter(item => item.name !== 'btn').forEach((item) => {
        item.name === 'price' ? this.despesas += +item.value :'';
        item.value = '';
        item.style.border = '';
        item.name === 'type' ? item.labels[0].classList.remove(this.activeClass) : '';
      });
  
    } else {
      this.form.forEach((input) => {
        input.value === '' ? input.style.border = '2px solid #D25555': ''
      })
      
    }
  }

  async loadInfo() {
    const json = await this.fetchItem.initGet();
    // Carrega os dados do servidor
    json.forEach(( {nome,tipo,valor,categoria} ) => {
      const element = this.createElement(nome,valor,tipo,categoria)
      this.wrapper.innerHTML += element
    });
    this.addDeletEvent();

  }

  addEventClick() {
    this.formObj.btn.addEventListener('click',this.addElement);
    this.itemType.forEach( item => item.addEventListener('click', (event) => {this.checkItem(event,this.itemType)}));
  }
  setBind() {
    this.addElement = this.addElement.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.deletElement = this.deletElement.bind(this);
  }
  init(){
    loadItems();
    this.setBind();
    this.loadInfo();
    this.addEventClick();

    return this;
  }

}

const manage = new Manager().init();


