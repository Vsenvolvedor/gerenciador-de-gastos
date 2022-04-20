export default class FetchItems {
  constructor(url){
    this.url = url
    this.options = {
      
    }
  }
  initGet() {
    return fetch(this.url).then( r => r.json()).then(json => json)
  }
  initPost(value) {
    fetch(value,this.options)
  }
}