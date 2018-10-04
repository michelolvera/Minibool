var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var homePath = "../../";


function CargarFunciones() {
      $("#btn_usuario_cerrar").click(function (event) {
        CerrarSesion();
    });
    consulta_numero_notificaciones();
  llenar_inputs();

  $("#btn_guardar_ponderaciones").click(function (event) {
    $.ajax({
      method: "post",
      url: phpPath,
      data: { funcion: "actualizarPonderaciones", userName: getCookie("user"), userPass: getCookie("pass"), in_al_3: $("#in_tres_aleatorio").val(), in_al_4: $("#in_cuatro_aleatorio").val(), in_al_5: $("#in_cinco_aleatorio").val(), in_det_3: $("#in_tres_deterministico").val(), in_det_4: $("#in_cuatro_deterministico").val(), in_det_5: $("#in_cinco_deterministico").val() },
    })
      .done(function (respuesta) {
        console.log(respuesta);
        if (respuesta == 1) {
          alert(JsonIdioma["ActualizacionCorrecta"]);
        } else {
          alert("Ha currido un error al intentar guadar");
        }
      })
      .fail(function () {
        alert("Error");
      });
  });
  $("input[type=radio][name=in_estudia_si_gestion]").change(function (event) {
    if (this.value == 1) {
        $("#PreguntasEstudiante_gestion").css("display", "block");
    } else {
        $("#PreguntasEstudiante_gestion").css("display", "none");
    }
});
}

function ValidarCookie() {
  comprobarAdminPagina();
}

function CargarTextosPagina() {
  //Titulo
  $("#tituloPonderacion").text(JsonIdioma["TituloPonderacion"]);
  //Basico
  $("#btnEjercicios").text(JsonIdioma["Ejercicios"]);
  $("#btnRanking").text(JsonIdioma["Clasificacion"]);
  $("#btnEstadistica").text(JsonIdioma["Estadisticas"]);
  $("#btnAdmin").text(JsonIdioma["Administración"]);
  $("#btn_adm_ponderacion").text(JsonIdioma["Ponderacion"]);
  $("#btn_adm_notificaciones").text(JsonIdioma["Notificacion"]);
  $("#btn_adm_usuarios").text(JsonIdioma["Usuarios"]);
  $("#btn_adm_estadisticas").text(JsonIdioma["Estadisticas"]);
  $("#btn_dd_usuario_actual").text(JsonIdioma["Usuario"] + ": " + getCookie("user"));
  $("#btn_usuario_cuenta").text(JsonIdioma["ConfigurarCuenta"]);
  $("#btn_usuario_resultados").text(JsonIdioma["MisResultados"]);
  $("#btn_usuario_cerrar").text(JsonIdioma["CerrarSesion"]);
  $("#btn_acercade").text(JsonIdioma["AcercaDe"]);
  $("#text_titulo_usuario_gestion").text(JsonIdioma["ConfigurarCuenta"]);
  $("#lb_usuario_gestion").text(JsonIdioma["Usuario"]);
  $("#lb_nombre_gestion").text(JsonIdioma["Nombre"]);
  $("#lb_apellido_pat_gestion").text(JsonIdioma["ApellidoPaterno"]);
  $("#lb_apellido_mat_gestion").text(JsonIdioma["ApellidoMaterno"]);
  $("#lb_correo_gestion").text(JsonIdioma["CorreoElectronico"]);
  $("#lb_contrasenia_gestion").text(JsonIdioma["Pass"]);
  $("#lb_pais_gestion").text(JsonIdioma["Pais"]);
  $("#sp_estudiante_gestion").text(JsonIdioma["EstudiantePregunta"]);
  $("#lb_estudia_si_gestion").text(JsonIdioma["Si"]);
  $("#lb_estudia_no_gestion").text(JsonIdioma["No"]);
  $("#lb_escuela_gestion").text(JsonIdioma["Escuela"]);
  $("#lb_carrera_gestion").text(JsonIdioma["Especialidad"]);
  $("#lb_semestre_gestion").text(JsonIdioma["Semestre"]);
  $("#btn_guardar_acualizar_gestion").text(JsonIdioma["Actualizar"]);
  $("#text_titulo_detalles").text(JsonIdioma["MisResultados"]);
  $("#text_titulo_acercade_principal").text(JsonIdioma["AcercaDe"]);
  $("#AcercaDeModal").text(JsonIdioma["Descripcion"]);
  $("#profesoresColab").text(JsonIdioma["ProfColab"]);
  $("#joseDesc").text(JsonIdioma["JoseDesc"]);
  $("#octavioDesc").text(JsonIdioma["OctavioDesc"]);
  $("#nellyDesc").text(JsonIdioma["NellyDesc"]);
  $("#miriamDesc").text(JsonIdioma["MiriamDesc"]);
  $("#desarrolladores").text(JsonIdioma["Desarrolladores"]);
  $("#descJorge").text(JsonIdioma["DescJorge"]);
  $("#descMichel").text(JsonIdioma["DescMichel"]);
  $("#descAlan").text(JsonIdioma["DescAlan"]);
  $("#agradecimientoEspecial").text(JsonIdioma["AgradecimientoEspecial"]);
  $("#TecMex").text(JsonIdioma["TecMex"]);
  $("#TecMor").text(JsonIdioma["TecMor"]);
  //Epecifico
  $("#text-varibles").text(JsonIdioma["Variables"]);
  $("#text-aleatorio").text(JsonIdioma["Aleatorio"]);
  $("#text-deterministico").text(JsonIdioma["Conocido"]);
  $("#btn_guardar_ponderaciones").text(JsonIdioma["Guardar"]);
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
