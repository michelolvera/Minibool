var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";

function CargarFunciones() {
  llenar_inputs();

  $("#btn_guardar_ponderaciones").click(function (event) {
    $.ajax({
      method: "post",
      url: phpPath,
      data: { funcion: "actualizarPonderaciones", userName: getCookie("user"), userPass: getCookie("pass"), in_al_3:$("#in_tres_aleatorio").val(), in_al_4:$("#in_cuatro_aleatorio").val(), in_al_5:$("#in_cinco_aleatorio").val(), in_det_3:$("#in_tres_deterministico").val(), in_det_4:$("#in_cuatro_deterministico").val(), in_det_5:$("#in_cinco_deterministico").val()},
    })
      .done(function (respuesta) {
        console.log(respuesta);
        if (respuesta == 1) {
          alert("Las ponderaciones se han guardado correctamente");
        } else {
          alert("Ha currido un error al intentar guadar");
        }
      })
      .fail(function () {
        alert("Error");
      });
  });
}

function ValidarCookie() {
  comprobarAdminPagina();
}

function CargarTextosPagina() {

}

function llenar_inputs() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: { funcion: "consultarPonderaciones" },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#in_tres_aleatorio").val(jsonObject[0]["puntos"]);
      $("#in_cuatro_aleatorio").val(jsonObject[1]["puntos"]);
      $("#in_cinco_aleatorio").val(jsonObject[2]["puntos"]);
      $("#in_tres_deterministico").val(jsonObject[3]["puntos"]);
      $("#in_cuatro_deterministico").val(jsonObject[4]["puntos"]);
      $("#in_cinco_deterministico").val(jsonObject[5]["puntos"]);
    })
    .fail(function () {
      alert("Error");
    });
}
