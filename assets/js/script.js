import Menu from './modules/menu.js'

const activeClass = 'active'

const menu = new Menu('.header-menu','.ul-nav','.close-menu',activeClass).init()
