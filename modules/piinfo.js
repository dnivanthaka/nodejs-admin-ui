const exec = require('child_process').exec;
//ls -l | wc -l
/*exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});*/

var piinfo = {
    execute:  function(cmd){
        var ret = false;
    
        exec('vcgencmd '+cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
             }
            //console.log(`stdout: ${stdout}`);
            //console.log(`stderr: ${stderr}`);
            ret = stdout;
        });
        
        return ret;
    };
    
    cpuinfo: function(){
    
    };
    
    memory: function(){
    
    };
    
    meta: function(){
        var firmware = this.execute('version');
    };
    
    disks: function(){
    
    };

};

module.exports = piinfo;
