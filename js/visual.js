
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

    $('#exampleModal').on('shown.bs.modal', function () {
        $('#exampleModal').trigger('focus')
    })

    $("#botonporTabladeVerdad").on("change",function(){
        document.getElementById("inpFuncion").style.visibility = false;
    });
    $("#botonporMapaK").on("change",function(){
        document.getElementById("inpFuncion").style.visibility = false;
    });
    $("#botonporFuncion").on("change",function(){
        document.getElementById("inpFuncion").style.visibility = true;
    });
var func = function (){
  $('#botonporFuncion').addClass('active');
  $('#botonporTabladeVerdad').removeClass('active');
  $('#botonporMapaK').removeClass('active');
  $("#inpFuncion").show();
}
var tabla = function(){
  $('#botonporTabladeVerdad').addClass('active');
  $('#botonporFuncion').removeClass('active');
  $('#botonporMapaK').removeClass('active');
     $("#inpFuncion").hide();
}
var mapak = function(){
  $('#botonporMapaK').addClass('active');
  $('#botonporTabladeVerdad').removeClass('active');
  $('#botonporFuncion').removeClass('active');
     $("#inpFuncion").hide();
}
var vars = "";
var al = "";
var crear = function(tf){
  closeNav();
  $('#content').load('tablaDeVerdad.html');
  if($('#var4').is(':checked') || $('#Cvar4').is(':checked')){
      vars='<th scope="col">D</th>'
      al='<td><div '+tf+'>0</div></td>'
      console.log('cuatro');
  }
  if($('#var5').is(':checked') || $('#Cvar5').is(':checked')){
    vars='<th scope="col">D</th><th scope="col">E</th>'
    al='<td><div '+tf+'>0</div></td><td><div '+tf+'>0</div></td>'
    console.log('cinco');
  }
      $("#tablaVerdad").append('<thead>'+
      '<tr>'+
        '<th scope="col">A</th>'+
        '<th scope="col">B</th>'+
        '<th scope="col">C</th>'+
        vars+
        '<th scope="col">F</th>'+
      '</tr>'+
      '</thead>'+
      '<tbody>'+
      '<tr>'+
        '<th scope="row"><div '+tf+'>0</div></th>'+
        '<td><div '+tf+'>0</div></td>'+
        '<td><div '+tf+'>0</div</td>'+
        al+
        '<td><div '+tf+'>0</div></td>'+
      '</tr>'+
      '<tr>'+
        '<th scope="row"><div '+tf+'>0</div></th>'+
        '<td><div '+tf+'>0</div></td>'+
        '<td><div '+tf+'>0</div></td>'+
        al+
        '<td><div '+tf+'>0</div></td></tr>'+
      '<tr>'+
        '<th scope="row"><div '+tf+'>0</div></th>'+
        '<td><div '+tf+'>0</div></td>'+
        '<td><div '+tf+'>0</div></td>'+
        al+
        '<td><div '+tf+'>0</div></td>'+
      '</tr>'+
      '</tbody>');
};
