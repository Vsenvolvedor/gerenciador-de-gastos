export default class FetchItems {
  constructor(url){
    this.url = url;
  }
  async initGet() {
    const response = await fetch(this.url);
    const json = await response.json();
    return json;
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