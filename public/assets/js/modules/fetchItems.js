export default class FetchItems {
  constructor(url){
    this.url = url
    this.options = {
      method:"POST",
      body: JSON.stringify({teste:'teste'}),
      headers: {
        "Content-Type": "application/json"
      }
    }
  }
  initGet() {
    return fetch(this.url).then( r => r.json()).then(json => json)
  }
  initPost(value) {
    this.value = value
    fetch('/notes',this.options)
    .then(response => {console.log(response); return response.json()})
    .then((data) => console.log('Sucesso', data))
    .catch((data) => {
      console.log('erro', data)
    })
  }
}