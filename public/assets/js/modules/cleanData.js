const btn = document.querySelector('#clean-data');

async function cleanData() {
  await fetch('/clean',{
    method:"DELETE",
  })

  document.location.reload(true)
}

btn.addEventListener('click',cleanData)