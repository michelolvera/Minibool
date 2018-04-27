$(document).ready(function () {
  $("#inpFuncion").hide();
  $('#inpTabla').hide();
  $('#mapaContenedor').hide();
  $('#circuitoContenedor').hide();
  $('#inputFuncion').val("");
});
$(document).on('click', '.modal', function() {

    // su acción
});
$('#conocidoModal').on('shown.bs.modal', function () {
  $('#exampleModal').trigger('focus')
})

var func = function () {
  $('#botonporFuncion').addClass('active');
  $('#botonporTabladeVerdad').removeClass('active');
  $('#botonporMapaK').removeClass('active');
  $("#inpFuncion").show();
  $('#inpTabla').hide();
  $('#inputFuncion').focus();
  if ($('#Cvar3').is(':checked')) {
    $('#teclaD').addClass('disabled')
    $('#teclaD').removeClass('btn-primary')
    $('#teclaE').addClass('disabled')
    $('#teclaE').removeClass('btn-primary')
  }
  if ($('#Cvar4').is(':checked')) {
    $('#teclaD').removeClass('disabled')
    $('#teclaE').addClass('disabled')
    $('#teclaD').addClass('btn-primary')
    $('#teclaE').removeClass('btn-primary')
  }
  if ($('#Cvar5').is(':checked')) {
    $('#teclaD').removeClass('disabled')
    $('#teclaE').addClass('btn-primary')
    $('#teclaD').addClass('btn-primary')
    $('#teclaE').removeClass('disabled')
  }
  $('#btnIniciarConocido').hide();
}
var tabla = function () {
  $('#botonporTabladeVerdad').addClass('active');
  $('#botonporFuncion').removeClass('active');
  $('#botonporMapaK').removeClass('active');
  $("#inpFuncion").hide();
  crear('#tablaVerdadMini', false);
  $('#inpTabla').show();
  $('#btnIniciarConocido').show();
}
var mapak = function () {
  $('#botonporMapaK').addClass('active');
  $('#botonporTabladeVerdad').removeClass('active');
  $('#botonporFuncion').removeClass('active');
  $("#inpFuncion").hide();
  $('#inpTabla').hide();
  $('#btnIniciarConocido').show();
}
var limpiar = function(tabla) {
  $(tabla).html('');
}
var activarEjercicios = function() {
  $('#btnEjercicios').removeClass('disabled')
}
var cambioCvar = function(){
    if($('#botonporFuncion').hasClass('active')) {
      func();
    }
    else if($('#botonporTabladeVerdad').hasClass('active')) {
      tabla();
    }
    else if($('#botonporMapaK').hasClass('active')) {
      mapak();
    }
}
var crear = function (tabla, isAl) {
  var mainFuncion ="";
  var valA ="";
  var valB ="";
  var valC ="";
  var valD ="";
  var valE ="";
  if($('#botonporFuncion').hasClass('active')) {
    mainFuncion = $("#inputFuncion").val();
    }
    else{

    }
  if(isAl){
    $('#tabtablaVerdad').removeClass('disabled')
    $('#tabtablaVerdad').addClass('active')
    $('#tabMapakarnaugh').removeClass('disabled')
    $('#tabCircuito').removeClass('disabled')
  }
  if (tabla == "#tablaVerdad"){
    $('#btnEjercicios').addClass('disabled')
    $('#cardFuncion').html('F='+mainFuncion+'<button href="./principal" class="btn btn-outline-danger derecha" onclick="activarEjercicios(), location.reload()" data-toggle="modal">Detener ejercicio</button>')
  }

  limpiar(tabla);
  var vars = "";
  var f = "";
  var tablaContent = "";
  var vueltas = 0;
  if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
    vueltas = 8;
  }
  if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
    vueltas = 16;
  }
  if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
    vueltas = 32;
  }
    tablaContent = '<thead>' +
      '<tr>' +
      '<th scope="col">A</th>' +
      '<th scope="col">B</th>' +
      '<th scope="col">C</th>';
    if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
      tablaContent += '<th scope="col">D</th>';
    }

    if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
      tablaContent += '<th scope="col">D</th>';
      tablaContent += '<th scope="col">E</th>';
    }
    if (tabla == "#tablaVerdad") {
      tablaContent += '<th scope="col">F</th>';
    }
    else{
      tablaContent += '<th scope="col">F</th>';
    }
    tablaContent += '</tr>' +
      '</thead>' +
      '<tbody>';
    for (var num = 0; num < vueltas; num++) {
      tablaContent += '<tr>';
      if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
        valA = dec2bin(num, 3).charAt(0);
        valB = dec2bin(num, 3).charAt(1);
        valC = dec2bin(num, 3).charAt(2);
        tablaContent += '<td scope="row">' + dec2bin(num, 3).charAt(0) + '</th>' +
          '<td>' + dec2bin(num, 3).charAt(1) + '</td>' +
          '<td>' + dec2bin(num, 3).charAt(2) + '</td>';
      }
      if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
        valA = dec2bin(num, 4).charAt(0);
        valB = dec2bin(num, 4).charAt(1);
        valC = dec2bin(num, 4).charAt(2);
        valD = dec2bin(num, 4).charAt(3);
        tablaContent += '<td scope="row">' + dec2bin(num, 4).charAt(0) + '</th>' +
          '<td>' + dec2bin(num, 4).charAt(1) + '</td>' +
          '<td>' + dec2bin(num, 4).charAt(2) + '</td>' +
          '<td>' + dec2bin(num, 4).charAt(3) + '</td>';
      }

      if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
        valA = dec2bin(num, 5).charAt(0);
        valB = dec2bin(num, 5).charAt(1);
        valC = dec2bin(num, 5).charAt(2);
        valD = dec2bin(num, 5).charAt(3);
        valE = dec2bin(num, 5).charAt(4);
        tablaContent += '<td scope="row">' + dec2bin(num, 5).charAt(0) + '</th>' +
          '<td>' + dec2bin(num, 5).charAt(1) + '</td>' +
          '<td>' + dec2bin(num, 5).charAt(2) + '</td>' +
          '<td>' + dec2bin(num, 5).charAt(3) + '</td>' +
          '<td>' + dec2bin(num, 5).charAt(4) + '</td>';
      }
      if (tabla == "#tablaVerdad") {
        if (isAl) {
          tablaContent += '<td>' + getRandom() + '</td>';
        }
        else {
          if($('#botonporFuncion').hasClass('active')) {
            var replaceFuncion = mainFuncion;
            var res="";
            replaceFuncion = replaceFuncion.replace('A',valA)
            replaceFuncion = replaceFuncion.replace('B',valB)
            replaceFuncion = replaceFuncion.replace('C',valC)
            replaceFuncion = replaceFuncion.replace('D',valD)
            replaceFuncion = replaceFuncion.replace('E',valE)
            replaceFuncion = replaceFuncion.replace('*',"&&")
            replaceFuncion = replaceFuncion.replace("1'","0")
            replaceFuncion = replaceFuncion.replace("0'","1")
            if(!!eval(replaceFuncion)){
              res="1"
            }else{
              res="0"
            }
            tablaContent += '<td>' + res + '</td>';
          }
          else{
              tablaContent += '<td>' + $('#btnTabla'+num).html() + '</td>';
          }
        }
      }
      else{
        tablaContent += '<td><button id="btnTabla'+num+'"class="btn verde" onClick="cambiarNum('+num+')">0</button></td>';
      }
      tablaContent += '</tr>';
    }
    tablaContent += '</tbody>';
    $(tabla).append(tablaContent);

  };

function dec2bin(dec, c) {
  var num = (dec >>> 0).toString(2);
  while (num.length < c) {
    num = '0' + num;
  }
  return num;
}
function getRandom() {
  return Math.floor(Math.random() * (2 - 0)) + 0;
}
function cambiarNum(num){
  console.log('entre a la funcion cambiarNum');
  if($('#btnTabla'+num).html()=='0'){
    $('#btnTabla'+num).html('1');
    console.log('entre al if');
  }
  else{
    $('#btnTabla'+num).html('0');
  }
}

var tabTablaclick = function(){
  $('#tablaContenedor').show();
  $('#mapaContenedor').hide();
  $('#circuitoContenedor').hide();
}
var tabMapaclick = function() {
  $('#tablaContenedor').hide();
  $('#mapaContenedor').show();
  $('#circuitoContenedor').hide();
}
var tabCircuitoclick = function() {
  $('#tablaContenedor').hide();
  $('#mapaContenedor').hide();
  $('#circuitoContenedor').show();
}

function teclaAClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"A");
  validarEntrada();
}
function teclaBClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"B");
  validarEntrada();
}
function teclaCClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"C");
  validarEntrada();
}
function teclaDClick(){
  if($('#teclaD').hasClass('btn-primary')) {
    $('#inputFuncion').val($('#inputFuncion').val()+"D");
    validarEntrada();
  }
}
function teclaEClick(){
  if($('#teclaE').hasClass('btn-primary')) {
    $('#inputFuncion').val($('#inputFuncion').val()+"E");
    validarEntrada();
  }
}
function teclaIzqClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"(");
  validarEntrada();
}
function teclaDerClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+")");
  validarEntrada();
}
function teclaNegClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"'");
  validarEntrada();
}
function teclaMasClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"+");
  validarEntrada();
}
function teclaPorClick(){
  $('#inputFuncion').val($('#inputFuncion').val()+"*");
  validarEntrada();
}


////////////////////  FUNCIONES PARA VALIDAR FUNCIONES  ///////////////////
function validarEntrada(){
  isBalanced();
  if($("#inputFuncion").hasClass('is-invalid')){
    return false;
  }
  var regNUM =/\([ABC\+']+\)/gi
  console.log($( "#inputFuncion" ).val())
  
  if(regNUM.test($("#inputFuncion").val())){
    $( "#inputFuncion" ).removeClass('is-invalid')
    $( "#inputFuncion" ).addClass('is-valid')
    $('#btnIniciarConocido').show();
    return true;
  }
  else{
    $( "#inputFuncion" ).removeClass('is-valid')
    $( "#inputFuncion" ).addClass('is-invalid')
    $('#btnIniciarConocido').hide();
    return false;
  }
}

var tokens = [ ['{','}'] , ['[',']'] , ['(',')'] ];
// *** Check if character is an opening bracket ***
function isOpenParenthesis(parenthesisChar) {
  for (var j = 0; j < tokens.length; j++) {
    if (tokens[j][0] === parenthesisChar) {
      return true;
    }
  }
  return false;
}

// *** Check if opening bracket matches closing bracket ***
function matches(topOfStack, closedParenthesis) {
  for (var k = 0; k < tokens.length; k++) {
    if (tokens[k][0] === topOfStack && tokens[k][1] === closedParenthesis) {
      return true;
    }
  }
  return false;
}

// *** Checks if item is any sort of paranthesis ***
function isParanthesis(char) {
  var str = '{}[]()';
  if (str.indexOf(char) > -1) {
    return true;
  } else {
    return false;
  }
}

// *** Prints answer of the string to the HTML page  ***
function printToScreen(bool) {
  var parensStr = document.getElementById('inputFuncion');
  var inputStr = parensStr.value

  if (bool) {
    $( "#inputFuncion" ).removeClass('is-invalid')
    $( "#inputFuncion" ).addClass('is-valid')
    $('#btnIniciarConocido').show();
  } else {
    $( "#inputFuncion" ).removeClass('is-valid')
    $( "#inputFuncion" ).addClass('is-invalid')
    $('#btnIniciarConocido').hide();
  }
}

// *** We excute this function upon the event ***
function isBalanced() {
  var parensStr = document.getElementById('inputFuncion');
  var inputStr = parensStr.value
  if (inputStr === null) { printToScreen(true); }

  var expression = inputStr.split('');
  var stack = [];

  for (var i = 0; i < expression.length; i++) {
    if (isParanthesis(expression[i])) {
      if (isOpenParenthesis(expression[i])) {
        stack.push(expression[i]);
      } else {
        if (stack.length === 0) {
          return printToScreen(false);
        }
        var top = stack.pop(); // pop off the top element from stack
        if (!matches(top, expression[i])) {
          return printToScreen(false);
        }
      }
    }
  }

  var returnValue = stack.length === 0 ? true : false;
  printToScreen(returnValue)
}
