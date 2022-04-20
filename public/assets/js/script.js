import Menu from './modules/menu.js'
import { loadItems } from './modules/attValues.js'

loadItems()

const activeClass = 'active'

const menu = new Menu('.header-menu','.ul-nav','.close-menu',activeClass).init()
const modal = new Menu('#add-note','.modal-note','.modal-close',activeClass,true).init()
const modal2 = new Menu('.add-btn','.modal-g','.modal-close',activeClass,true).init()

export {modal,modal2}

