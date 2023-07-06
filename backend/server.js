const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();

let corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(express.static('/static', __dirname + '/views/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/views/index.html');
})

app.get('/hello', (req, res) => {
    console.log('hello again');
    res.send('hello again');
})

app.post('/sendquery', (req, res)=>{
    let data = req.body;
    console.log(data);
    res.send('ok');
})


app.listen('3001', 'localhost', () => {
    console.log('backend server is listening on port 3001')
});