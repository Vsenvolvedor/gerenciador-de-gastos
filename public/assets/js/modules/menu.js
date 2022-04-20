import outsideClick from "./outside-click.js"

export default class Menu{
  constructor(btn,menu,closeMenu,activeClass,child){
    this.btn = document.querySelector(btn)
    this.menu = document.querySelector(menu)
    this.closeMenu = document.querySelectorAll(closeMenu)
    this.activeClass = activeClass
    this.child = child | false

    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu(event, type = false){
    this.menu.classList.toggle('active')
    if(this.child){
      document.querySelector('body').style.overflowY = type || 'hidden'
      outsideClick(this.btn,this.menu.firstElementChild,this.activeClass)
    }
    else{outsideClick(this.btn,this.menu,this.activeClass)}
  }

  addEvent(){
    this.btn.addEventListener('click',this.toggleMenu)
    this.closeMenu.forEach(item => item.addEventListener('click',(event) => this.toggleMenu(event,'auto')))
  }
  init(){
    if(this.btn && this.menu){
      this.addEvent()
    }
    return this
  }
}
  