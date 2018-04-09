var phpPath = "php/Selector.php";
var langPath = "json/string.json";
var tabla='<tr>'+
'<th id="text_tabla_nombre">Nombre</th>'+
'<th id="text_tabla_apellido_pat">Apellido paterno</th>'+
'<th id="text_tabla_apellido_mat">Apellido materno</th>'+
'<th id="text_tabla_accion">Accion</th> '+
'</tr>';

function CargarFunciones() {
    llenar_tabla("","","");

    $("#btn_busqueda").click(function (event){
      llenar_tabla( $("#in_nombre").val(),$("#in_apellido_pat").val(),$("#in_apellido_mat").val());
    });
}

function ValidarCookie() {

}

function CargarTextosPagina(){

}

function llenar_tabla(nombre, apellidoPat, apellidoMat) {
    $.ajax({
        method: "post",
        url: "php/Selector.php",
        data: {funcion:"consultaUsuarios", likeNombre:nombre, likeApellidoPat:apellidoPat, likeApellidoMat:apellidoMat},
        dataType: "json"
      })
      .done(function (jsonObject) {
        console.log(jsonObject);
      })
      .fail(function () {
        alert("Error");
      });
}
