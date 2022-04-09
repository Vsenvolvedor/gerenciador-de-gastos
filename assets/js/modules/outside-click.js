export default function outsideClick(btn,element,act){

  function outside({target}){
    if(!(element.contains(target) || btn.contains(target))){
      element.classList.remove(act)
    }
  }

  window.addEventListener('click',outside)
}