var express = require('express');
var app = express();

//var bootstrap = require('bootstrap');

app.use(express.static('public'));
app.get('/', function(req, res){
res.send('It works!!!');
});
var server = app.listen(8081, function(){
var host = server.address().address;
var port = server.address().port;
console.log("Server listening on http://%s:%s", host, port);
});
