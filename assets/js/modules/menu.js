export default class Menu{
  constructor(btn,menu,closeMenu,activeClass){
    this.btn = document.querySelector(btn)
    this.menu = document.querySelector(menu)
    this.closeMenu = document.querySelector(closeMenu)
    this.activeClass = activeClass

    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu(){
    this.menu.classList.toggle('active')
  }

  addEvent(){
    this.btn.addEventListener('click',this.toggleMenu)
    this.closeMenu.addEventListener('click',this.toggleMenu)
  }
  init(){
    this.addEvent()
    return this
  }
}
  