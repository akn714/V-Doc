const express = require('express')

let app = express();

app.get('/', (req, res) => {
    console.log('hello');
    res.send('hello');
})
app.get('/hello', (req, res) => {
    console.log('hello again');
    res.send('hello again');
})

app.listen('3001', 'localhost', () => {
    console.log('backend server is listening on port 3001')
});