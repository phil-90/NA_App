// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var routes = require('./routes/index');

// config
//mongoose.connect('mongodb://localhost/myapp');

app.use(express.static(__dirname + '/'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.get('*', function(req, res){
    res.sendfile('index.html');
});

//io
io.on('connection', function(socket){
    console.log('connected');
    socket.emit('greetings', {msg: 'hello'});
    socket.on('something', function(data){
        console.log(data);
    });
});

//error handling

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000);
console.log('app listening on 3000');