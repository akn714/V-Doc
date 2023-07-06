fetch('http://localhost:3001/sendquery', {
    method: 'POST',
    body: new FormData(document.querySelector('form'))
})
.then(res => res.text())
.then(data => console.log(data));