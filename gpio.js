/*
 * GPIO control library for Raspberry pi
 * Author: D.N. Amerasinghe
 *
*/
var sysfs_gpio = '/sys/class/gpio';

//Raspberry pi valid GPIO numbers
var valid_gpio = [2, 3, 4, 17, 27, 22, 10, 9, 11, 5, 6, 
                  13, 19, 26, 21, 20, 16, 12, 7, 8, 25, 
                  24, 23, 18, 15, 14];
                  
var exported_gpio = [];              

var fs = require('fs');
var exports = module.exports = {};


exports.GPIO = {
    OUT: 'out',
    IN: 'in', 
    HI: 1,
    LO: 0,

    init:  function(){
        //TODO Read the states of GPIO pins here
        var files = fs.readdirSync(sysfs_gpio);
        for(var i=0;i<files.length;i++){
            if(files[i] === 'export' || files[i] === 'unexport'){
                continue;
            }
            
            var dir = fs.readFileSync(sysfs_gpio + '/' + files[i] + '/direction');
            
            exported_gpio.push([files[i], dir]);
        }
        
        console.log(exported_gpio[0][0] + " - " + exported_gpio[1][0]);
        /*for(var i=0;i<valid_gpio.length;i++){
            var pin = valid_gpio[i];
            if(fs.accessSync(sysfs_gpio + '/' + 'gpio' + pin.toString() + '/direction')){
                
            }
        }*/
    },

    export: function(pin){
        if(!this.valid_gpio(pin)){
            return -1;
        }
        
        //TODO check if its already exported
        var fp = fs.openSync(sysfs_gpio + '/' + 'export', 'w');
        fs.writeSync(fp, pin.toString());
        fs.closeSync(fp);
    },
    
    unexport: function(pin){
        if(!this.valid_gpio(pin)){
            return -1;
        }
        
        //TODO check if its already exported
        var fp = fs.openSync(sysfs_gpio + '/' + 'unexport', 'w');
        fs.writeSync(fp, pin.toString());
        fs.closeSync(fp);
    },

    dir: function(pin, dir){
        if(!this.valid_gpio(pin)){
            return -1;
        }
        //TODO check if its already in the same direction
        var fp = fs.openSync(sysfs_gpio + '/' + 'gpio' + pin.toString() + '/direction', 'w');
        fs.writeSync(fp, dir);
        fs.closeSync(fp);
    },

    set: function(pin, val){
        if(!this.valid_gpio(pin)){
            return -1;
        }
        
        var fp = fs.openSync(sysfs_gpio + '/' + 'gpio' + pin.toString() + '/value', 'w');
        fs.writeSync(fp, val.toString());
        fs.closeSync(fp);
    },

    get: function(pin){
        var val = -1;
        
        if(!this.valid_gpio(pin)){
            return -1;
        }
        
        var fp = fs.openSync(sysfs_gpio + '/' + 'gpio' + pin.toString() + '/value', 'r');
        val = fs.readSync(fp);
        fs.closeSync(fp);
        
        return val;
    },
    valid_gpio: function(pin){
        if(valid_gpio.indexOf(pin) < 0){
            console.log("Invalid GPIO pin %d", pin);
            throw new Error("Invalid GPIO pin");
            return false;
        }
        
        return true;
    }
}


