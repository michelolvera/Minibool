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
  if ($('#Cvar3').is(':checked')) {
     if($("#inputFuncion").val().includes('D') || $("#inputFuncion").val().includes('d')){
       mostrarError('Error: Variable D no permitida');
     }
     if($("#inputFuncion").val().includes('E') || $("#inputFuncion").val().includes('e')){
       mostrarError('Error: Variable E no permitida');
     }
  }
  if ($('#Cvar4').is(':checked')) {
     if($("#inputFuncion").val().includes('E') || $("#inputFuncion").val().includes('e')){
       mostrarError('Error: Variable E no permitida');
     }
  }
}

var mostrarError = function(e){
  $( "#inputFuncion" ).removeClass('is-valid')
  $( "#inputFuncion" ).addClass('is-invalid')
  $("#invalidMessage").text(e);
  $('#btnIniciarConocido').hide();
}
