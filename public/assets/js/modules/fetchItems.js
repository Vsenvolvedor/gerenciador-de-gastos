export default class FetchItems {
  constructor(url){
    this.url = url;
  }
  initGet() {
    return fetch(this.url).then( r => r.json()).then(json => json);
  }
  initPost(value) {
    fetch(this.url,{ 
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });
  }
  initDelet(value) {
    fetch('/delet',{ 
      method:"DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {value, url:this.url} )
    });
  }
}