export default class FetchItems {
  constructor(url){
    this.url = url
    this.options = {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.value)
    }
  }
  initGet() {
    return fetch(this.url).then( r => r.json()).then(json => json)
  }
  initPost(value) {
    this.value = value
    fetch(this.url,this.options)
    .then(response => response.json())
    .then((data) => console.log('Sucesso', data))
    .catch((data) => {
      console.log('erro', data)
    })
  }
}