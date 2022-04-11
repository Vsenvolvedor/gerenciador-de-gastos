import {modal2} from "../script.js"

class Manager {
  constructor(wrapper,form){
    

  }
 
  init(){
    if(this.wrapper && this.form){this.addEventClick();this.deletEvent()}
    return this
  }
}

const manager = new Manager('.g-wrapper','#modal').init()
