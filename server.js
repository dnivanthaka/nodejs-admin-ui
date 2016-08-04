//http://www.w3schools.com/howto/howto_css_switch.asp
var express = require('express');
var app = express();
var gpio = require('./gpio.js');

//var bootstrap = require('bootstrap');

app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('It works!!!');
});

//Init GPIO
gpio.init();

app.get('/gpio/list', function(req, res){
    var list = JSON.stringify(gpio.get_gpiolist());
    
    res.end(list);
});

app.get('/gpio/exported', function(req, res){
    //res.send('It works!!!');
    //gpio.export(17);
    console.log(JSON.stringify(gpio.get_exported()));
    gpio.dir(17, gpio.OUT);
    gpio.set(17, 1);
    console.log(JSON.stringify(gpio.get_exported()));
    //console.log(gpio.GPIO.OUT);
    
    res.end(JSON.stringify(gpio.get_exported()));
});

app.get('/gpio/:id', function(req, res){
    var pin = Number(req.params.id);
    //gpio.export(17);
    console.log(JSON.stringify(gpio.get_exported()));
    gpio.dir(pin, gpio.OUT);
    gpio.set(pin, 0);
    console.log(JSON.stringify(gpio.get_exported()));
    //console.log(gpio.GPIO.OUT);
    
    res.end(JSON.stringify(gpio.get_exported()));
});

app.get('/gpio/:id/:value', function(req, res){
    var pin = Number(req.params.id);
    var val = Number(req.params.value);
    //gpio.export(17);
    console.log(JSON.stringify(gpio.get_exported()));
    gpio.dir(pin, gpio.OUT);
    gpio.set(pin, val);
    console.log(JSON.stringify(gpio.get_exported()));
    //console.log(gpio.GPIO.OUT);
    
    res.end(JSON.stringify(gpio.get_exported()));
});

var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening on http://%s:%s", host, port);
});
