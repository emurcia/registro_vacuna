
var element = document.getElementById('dui');
var maskOptions = {
  mask: '00000000-0'
};

var mask = IMask(element, maskOptions);

$("#formGeneral").validate({
    rules: {
        dui: {required:true, minlength:10},
		dob: {required:true, minlength:10}
    },
    messages: {
        dui: "Por favor escriba su dui",
        dob: "Por favor escriba su fecha de Nacimiento",

    }
});

$( "#bt_main" ).click(function() {
	
	if ($("#formGeneral").valid() == true) {
		var v1 = $('#dui').val();
		var v2 = $('#dob').val();
		
		
		var midata = {v1:v1, v2:v2, opcion:'checkUser'};
		$.ajax({
			async : true,
			method: "POST",
			url: "procesos.php",
			data: midata,
			success: function(msg){
				console.log(msg);
				$("#msg").show();
				$("#msg").html(msg);
		   }
		 });	
	} else {$("#msg").show(); $("#msg").html("Información Incompleta");}
});

$( "#v1" ).click(function() {
	$('#v1').css({
        'background-color': 'rgba(66,153,225,var(--bg-opacity))',
        'color': 'white'
	});
	$('#v2').css({
        'background-color': 'rgba(237,242,247,var(--bg-opacity))',
        'color': 'black'
	});

$("#bl2").hide();	
$("#bl1").show();
$('#tdoc').val(1);
	
});

$( "#v2" ).click(function() {
	$('#v2').css({
        'background-color': 'rgba(66,153,225,var(--bg-opacity))',
        'color': 'white'
	});
	$('#v1').css({
        'background-color': 'rgba(237,242,247,var(--bg-opacity))',
        'color': 'black'
	});
	
$("#bl2").show();	
$("#bl1").hide();
$('#tdoc').val(2);
});