export default function outsideClick(btn,element,act){

  function outside( { target } ){
    if( !(element.contains(target) || btn.contains(target) ) ) {
      element.classList.remove(act);
      element.parentElement.classList.remove(act);
      document.querySelector('body').style.overflowY = 'auto';
      window.removeEventListener('click', outside);
    };
  };

  window.addEventListener('click',outside);
}