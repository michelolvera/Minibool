function teclaAClick(){
}
function teclaBClick(){
}
function teclaCClick(){
}
function teclaDClick(){
}
function teclaEClick(){
}
function teclaIzqClick(){
}
function teclaDerClick(){
}
function teclaNegClick(){
}
function teclaMasClick(){
}
function teclaPorClick(){
}


////////////////////  FUNCIONES PARA VALIDAR FUNCIONES  ///////////////////
function validarVariables(nVars){
	if (nVars>3) {
		nVars-=3
		var mayus = 68+nVars;//90
		var minus=100+nVars;//122
	}else{
		var mayus = 68;//90
		var minus=100;//122
	}
	for (; mayus < 91 ; mayus++) {
		if($("#inputFuncion").val().includes(String.fromCharCode(mayus)) || $("#inputFuncion").val().includes(String.fromCharCode(minus))){
			mostrarError('Error: Variable '+ String.fromCharCode(mayus) +' no permitida');
		}
		minus++;
	}
}

function validarEntrada(){
	try {
		booleanFun.parse($("#inputFuncion").val())
		$( "#inputFuncion" ).removeClass('is-invalid')
		$( "#inputFuncion" ).addClass('is-valid')
		$('#btnIniciarConocido').show();
	} catch (e) {
		mostrarError(e);
	}
	if($("#inputFuncion").val()==null){
		$('#btnIniciarConocido').hide();
	}
	if($("#inputFuncion").val().includes('F') || $("#inputFuncion").val().includes('f')){
		mostrarError('Error: Variable F no permitida en ningún momento');
	}
	if ($('#Cvar3').is(':checked')) {
		validarVariables(3);
	}
	if ($('#Cvar4').is(':checked')) {
		validarVariables(4);
	}//CvarN
	if ($('#Cvar5').is(':checked')) {
		validarVariables(5);
	}
	if ($('#CvarN').is(':checked')) {
		validarVariables($("#CNVariables").val());
	}
}

var mostrarError = function(e){
	$( "#inputFuncion" ).removeClass('is-valid')
	$( "#inputFuncion" ).addClass('is-invalid')
	$("#invalidMessage").text(e);
	$('#btnIniciarConocido').hide();
}

