const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Hi!');
});

app.get('/albums', (req, res) => {
    const fakeData = [ 'a', 'b', 'c', 'd', 'ab' ];
    const responseData = fakeData.filter((item) => item.includes(req.query.searchTerm))
    res.json(responseData)
})

app.listen(port, () => {
    console.log('Listening...')
})