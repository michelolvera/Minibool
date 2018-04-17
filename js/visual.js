$(document).ready(function () {
  $('#inpTabla').hide();
  });

    $('#exampleModal').on('shown.bs.modal', function () {
        $('#exampleModal').trigger('focus')
    })

var func = function (){
  $('#botonporFuncion').addClass('active');
  $('#botonporTabladeVerdad').removeClass('active');
  $('#botonporMapaK').removeClass('active');
  $("#inpFuncion").show();
  $('#inpTabla').hide();
}
var tabla = function(){
  $('#botonporTabladeVerdad').addClass('active');
  $('#botonporFuncion').removeClass('active');
  $('#botonporMapaK').removeClass('active');
     $("#inpFuncion").hide();
     crear('#tablaVerdadMini',false);
     $('#inpTabla').show();

}
var mapak = function(){
  $('#botonporMapaK').addClass('active');
  $('#botonporTabladeVerdad').removeClass('active');
  $('#botonporFuncion').removeClass('active');
     $("#inpFuncion").hide();
     $('#inpTabla').hide();
}
var crear = function(tabla, isAl){
  var vars="";
  var f="";
  var tablaContent="";
  var vueltas = 0;
  if($('#var3').is(':checked') || $('#Cvar3').is(':checked')){
    vueltas = 8;
  }
  if($('#var4').is(':checked') || $('#Cvar4').is(':checked')){
    vueltas = 16;
  if($('#var5').is(':checked') || $('#Cvar5').is(':checked')){
    console.log("cinco jalas1");
    vueltas = 32;
  }
      tablaContent = '<thead>'+
      '<tr>'+
        '<th scope="col">A</th>'+
        '<th scope="col">B</th>'+
        '<th scope="col">C</th>';
        if($('#var4').is(':checked') || $('#Cvar4').is(':checked')){
          tablaContent += '<th scope="col">D</th>';
        }

        if($('#var5').is(':checked') || $('#Cvar5').is(':checked')){
          console.log("cinco primer if");
          tablaContent += '<th scope="col">D</th>';
          tablaContent += '<th scope="col">E</th>';
        }
        if(tabla == "#tablaVerdad"){
          tablaContent +='<th scope="col">F</th>';
        }
      tablaContent += '</tr>'+
      '</thead>'+
      '<tbody>';
      for(var num = 0;num<vueltas;num ++){
        console.log("entre al for");
      tablaContent += '<tr>';
      if($('#var3').is(':checked') || $('#Cvar3').is(':checked')){
        tablaContent += '<td scope="row">'+ dec2bin(num,3).charAt(0) +'</th>'+
        '<td>'+ dec2bin(num,3).charAt(1) +'</td>'+
        '<td>'+ dec2bin(num,3).charAt(2) +'</td>';
      }
        if($('#var4').is(':checked') || $('#Cvar4').is(':checked')){
          tablaContent += '<td scope="row">'+ dec2bin(num,4).charAt(0) +'</th>'+
          '<td>'+ dec2bin(num,4).charAt(1) +'</td>'+
          '<td>'+ dec2bin(num,4).charAt(2) +'</td>'+
          '<td>'+ dec2bin(num,4).charAt(3) +'</td>';
        }

        if($('#var5').is(':checked') || $('#Cvar5').is(':checked')){
          console.log("cinco jalas");
          tablaContent += '<td scope="row">'+ dec2bin(num,5).charAt(0) +'</th>'+
          '<td>'+ dec2bin(num,5).charAt(1) +'</td>'+
          '<td>'+ dec2bin(num,5).charAt(2) +'</td>'+
          '<td>'+ dec2bin(num,5).charAt(3) +'</td>'+
          '<td>'+ dec2bin(num,5).charAt(4) +'</td>';
        }
        if(tabla == "#tablaVerdad"){
          if(isAl){
            tablaContent +='<td>'+ getRandom() +'</td>';
          }
          else{
            tablaContent +='<td>'+ getRandom() +'</td>';
          }
        }
        tablaContent += '</tr>';
      }
        tablaContent +='</tbody>';
    $(tabla).append(tablaContent);
      console.log('fin append');
};

}
function dec2bin(dec,c){
	var num = (dec >>> 0).toString(2);
	while (num.length < c) {
        num = '0'+num;
      }
    return num;
}
function getRandom() {
  return Math.floor(Math.random() * (2 - 0)) + 0;
}
