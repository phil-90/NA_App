// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// config
//mongoose.connect('mongodb://localhost/myapp');

app.use(express.static(__dirname + '../'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.get('*', function(req, res){
    res.sendfile('index.html');
});


app.listen(3000);
console.log('app listening on 3000');