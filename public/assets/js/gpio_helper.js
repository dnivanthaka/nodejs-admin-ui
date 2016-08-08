var gpio_list = [];
var exported_list = [];
var cntIn = 1;
var cntOut = 1;

$(document).ready(function(){
        $(document).on('click', '.gpio_toggle', function(){
            //alert($(this).prop('checked'));
var pin = $(this).attr('data-pin');
            if($(this).prop('checked')){
                $.get('gpio/set/'+pin+'/1');
            }else{
                $.get('gpio/set/'+pin+'/0');
            }
        });


$(document).on('click', '.gpio_unexport', function(){
var pin = $(this).attr('data-pin');
            
            $.get('gpio/unexport/'+pin);

    });

    $(document).on('change', '.gpio_status_toggle', function(){
        var mode = $(this).val();
        var pin  = $(this).attr('data-pin');

        //var expVal = getExportedDir(exported_list, pin);


        $.get('gpio/export/'+pin+'/'+mode);
    });

    populateGPIOList();

    //Running and updating
    setInterval(function(){
        //clearGPIOLists();
        //populateGPIOList();
        //$('#gpio_output_list').find('tr:gt(0)').remove();
        //$('#gpio_input_list').find('tr:gt(0)').remove();
        toggleGPIOExported();

    }, 1000);

    });

function populateGPIOList(){
        $.getJSON('gpio/list', function(data){
            //alert(data);
        gpio_list = data;
            for(var i=0;i<data.length;i++){
                $('#gpio_list').append('<tr><td>'+(i + 1)+'</td><td>'+data[i]+'</td><td><div class="btn-group btn-group-xs" data-toggle="buttons" role="group" aria-label=""><label id="label2" class="btn btn-primary"><input type="radio" class="gpio_status_toggle" id="gpio_'+data[i]+'_input" name="gpio'+(i+1)+'" value="input" data-pin="'+data[i]+'" autocomplete="off">Input</input></label><label id="label2" class="btn btn-primary"><input type="radio" class="gpio_status_toggle" id="gpio_'+data[i]+'_output" name="gpio'+(i+1)+'" value="output" data-pin="'+data[i]+'" autocomplete="off">Output</input></label><button type="button" id="gpio_'+data[i]+'_unexport" data-pin="'+data[i]+'" class="btn btn-warning gpio_unexport disabled">Unexport</button></div></td>');
            }

        });    

        toggleGPIOExported();
}

function toggleGPIOExported(){
        $.getJSON('gpio/exported', function(data){
        exported_list = data;
        
        
                //Toggle already exported pins
        for(var i=0;i<data.length;i++){
            
        if(data[i][1] == 'in'){
            //if(!$('#gpio_'+data[i][0]+'_input').prop('checked')){
            if($('#gpio_input_list #gpio'+data[i][0]+'State').length == 0){
            $('#gpio_'+data[i][0]+'_input').prop('checked', true);
            $('#gpio_'+data[i][0]+'_input').closest('label').toggleClass('active');
            $('#gpio_'+data[i][0]+'_unexport').toggleClass('disabled');
            $('#gpio_input_list').append('<tr><td>'+cntIn+'</td><td>'+data[i][0]+'</td><td><div id="gpio'+data[i][0]+'State"></div></td></tr>');
        cntIn++;
            }
            //}
        }else{
            //alert(!$('#gpio_'+data[i][0]+'_output').prop('checked'));
            //if(!$('#gpio_'+data[i][0]+'_output').prop('checked')){
            if($('#gpio_output_list #gpio'+data[i][0]+'State').length == 0){
            $('#gpio_'+data[i][0]+'_output').prop('checked', true);
            $('#gpio_'+data[i][0]+'_output').closest('label').toggleClass('active');
            $('#gpio_'+data[i][0]+'_unexport').toggleClass('disabled');

            //alert($('#gpio_output_list #gpio'+data[i][0]+'State').length);            
            $('#gpio_output_list').append('<tr><td>'+cntOut+'</td><td>'+data[i][0]+'</td><td><label class="switch"><input type="checkbox" id="gpio'+data[i][0]+'State" data-pin="'+data[i][0]+'" class="gpio_toggle"><div class="slider round"></div></label></td></tr>');
       
            cntOut++;
            }
            //}
        }
}

        updateGPIOValues(exported_list);
            });
}

function clearGPIOLists(){
    $('#gpio_list').find('tr:gt(0)').remove();
    $('#gpio_output_list').find('tr:gt(0)').remove();
    $('#gpio_input_list').find('tr:gt(0)').remove();
}

function updateGPIOValues(list){
	var pinVal = 0;
	var pin;
	var dir;
	//alert(list);
	for(var i=0;i<list.length;i++){
		pin = list[i][0];
		dir = list[i][1];
		//alert(pin);
		setGPIOval(pin, dir);
	}
}

function setGPIOval(pin, dir){
	$.getJSON('gpio/get/'+pin, function(val){
		                pinVal = Number(val[0]);
				//alert(pin);
				if(dir == 'in'){
					//alert(pin+' setting input '+pinVal);
					$('#gpio_input_list #gpio'+pin+'State').html(pinVal);
				}else{
					//alert(pin+' setting output '+pinVal);
					if(pinVal === 1){
						$('#gpio_output_list #gpio'+pin+'State').prop('checked', true);
					}else{
						$('#gpio_output_list #gpio'+pin+'State').prop('checked', false);
					}
				}
		});
}

function getExportedDir(exp, pin){
	for(var i=0;i<exp.length;i++){
		if(exp[i][0] == pin){
			return exp[i][1];
		}
	}

	return false;
}
