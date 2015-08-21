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

var login = require('./routes/login');
var features = require('./routes/features');


app.use('/login', login);

//io
io.on('connection', function(socket){
  socket.on('send message', function(data){
    io.emit('get message', data);
   // console.log(data);
  });
  socket.on('disconnected', function(){
      console.log('asdfasdf');
  })
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

http.listen(3000);
console.log('app listening on 3000');
