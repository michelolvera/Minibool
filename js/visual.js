$(document).ready(function () {
  $('#inpTabla').hide();
  $('#mapaContenedor').hide();
  $('#circuitoContenedor').hide();
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
}
var tabla = function () {
  $('#botonporTabladeVerdad').addClass('active');
  $('#botonporFuncion').removeClass('active');
  $('#botonporMapaK').removeClass('active');
  $("#inpFuncion").hide();
  crear('#tablaVerdadMini', false);
  $('#inpTabla').show();

}
var mapak = function () {
  $('#botonporMapaK').addClass('active');
  $('#botonporTabladeVerdad').removeClass('active');
  $('#botonporFuncion').removeClass('active');
  $("#inpFuncion").hide();
  $('#inpTabla').hide();
}
var limpiar = function(tabla) {
  $(tabla).html('');
}
var activarEjercicios = function() {
  $('#btnEjercicios').removeClass('disabled')
}
var crear = function (tabla, isAl) {
  if(isAl){
    $('#btnEjercicios').addClass('disabled')
    $('#tabtablaVerdad').removeClass('disabled')
    $('#tabtablaVerdad').addClass('active')
    $('#tabMapakarnaugh').removeClass('disabled')
    $('#tabCircuito').removeClass('disabled')
    $('#cardFuncion').html('<button href="./principal" class="btn btn-outline-danger derecha" onclick="activarEjercicios(), location.reload()" data-toggle="modal">Detener ejercicio</button>')
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
      console.log("cinco jalas1");
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
      console.log("cinco primer if");
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
      console.log("entre al for");
      tablaContent += '<tr>';
      if ($('#var3').is(':checked') || $('#Cvar3').is(':checked')) {
        tablaContent += '<td scope="row">' + dec2bin(num, 3).charAt(0) + '</th>' +
          '<td>' + dec2bin(num, 3).charAt(1) + '</td>' +
          '<td>' + dec2bin(num, 3).charAt(2) + '</td>';
      }
      if ($('#var4').is(':checked') || $('#Cvar4').is(':checked')) {
        tablaContent += '<td scope="row">' + dec2bin(num, 4).charAt(0) + '</th>' +
          '<td>' + dec2bin(num, 4).charAt(1) + '</td>' +
          '<td>' + dec2bin(num, 4).charAt(2) + '</td>' +
          '<td>' + dec2bin(num, 4).charAt(3) + '</td>';
      }

      if ($('#var5').is(':checked') || $('#Cvar5').is(':checked')) {
        console.log("cinco jalas");
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
          tablaContent += '<td>' + $('#btnTabla'+num).html() + '</td>';
        }
      }
      else{
        tablaContent += '<td><button id="btnTabla'+num+'"class="btn verde" onClick="cambiarNum('+num+')">0</button></td>';
      }
      tablaContent += '</tr>';
    }
    tablaContent += '</tbody>';
    $(tabla).append(tablaContent);
    console.log('fin append');
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
