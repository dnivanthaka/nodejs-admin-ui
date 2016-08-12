//http://www.w3schools.com/howto/howto_css_switch.asp
//https://expressjs.com/en/guide/routing.html
var express = require('express');
var app = express();
var gpio = require('./modules/gpio.js');
var piinfo = require('./modules/piinfo.js');

//var bootstrap = require('bootstrap');

app.use(express.static('public'));
app.get('/', function(req, res){
    res.end();
    //res.send('It works!!!');
});

/*setInterval(function(){
    //console.log("Timeout");
}, 2000);*/


/*const exec = require('child_process').exec;
//ls -l | wc -l
exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});*/

piinfo.execute('measure_temp');

//Init GPIO
gpio.init();

app.get('/gpio/list', function(req, res){
    var list = JSON.stringify(gpio.get_gpiolist());
    
    res.end(list);
});

app.get('/gpio/exported', function(req, res){
    //res.send('It works!!!');
    //gpio.export(17);
    //console.log(JSON.stringify(gpio.get_exported()));
    //gpio.dir(17, gpio.OUT);
    //gpio.set(17, 1);
    //console.log(JSON.stringify(gpio.get_exported()));
    //console.log(gpio.GPIO.OUT);
    
    res.end(JSON.stringify(gpio.get_exported()));
});

app.get('/gpio/export/:id/:dir', function(req, res){
    var dir = req.params.dir;
    var pin = Number(req.params.id);
    //gpio.export(17);
    console.log(JSON.stringify(gpio.get_exported()));
    if(dir == 'input'){
        gpio.dir(pin, gpio.IN);
    }else{
        gpio.dir(pin, gpio.OUT);
        gpio.set(pin, 0);
    }
    console.log(JSON.stringify(gpio.get_exported()));
    //console.log(gpio.GPIO.OUT);
    
    res.end(JSON.stringify(gpio.get_exported()));
});

app.get('/gpio/unexport/:id', function(req, res){
    var pin = Number(req.params.id);
    gpio.unexport(pin);
    
    res.end(JSON.stringify(gpio.get_exported()));
});

app.get('/gpio/set/:id/:value', function(req, res){
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

app.get('/gpio/get/:id', function(req, res){
    var pin = Number(req.params.id);
    var val = 0;
    //gpio.export(17);
    //console.log(JSON.stringify(gpio.get_exported()));
    //gpio.dir(pin, gpio.OUT);
    val = gpio.get(pin);
    //console.log(JSON.stringify(gpio.get_exported()));
    //console.log(gpio.GPIO.OUT);
    
    res.end(JSON.stringify([Number(val)]));
});


var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening on http://%s:%s", host, port);
});
