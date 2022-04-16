export default class FetchItems {
  constructor(url){
    this.url = url
  }
  initFetch() {
    fetch(this.url).then( r => r.json()).then(json => json)
  }
}