var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('I want become backend developer. Hello world!');
});

app.listen(3000);