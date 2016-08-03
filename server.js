//http://www.w3schools.com/howto/howto_css_switch.asp
var express = require('express');
var app = express();
var gpio = require('./gpio.js');

//var bootstrap = require('bootstrap');

app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('It works!!!');
});

app.get('/gpio', function(req, res){
    //res.send('It works!!!');
    gpio.init();
    //gpio.export(17);
    console.log(gpio.get_exported());
    gpio.dir(17, gpio.OUT);
    gpio.set(17, 1);
    console.log(gpio.get_exported());
    //console.log(gpio.GPIO.OUT);
    
    res.end();
});

var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening on http://%s:%s", host, port);
});
