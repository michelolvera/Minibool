var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var tabla = "";
var idSeleccionado = '';
var queAccion = '';
var homePath = "../../";


function CargarFunciones() {
    $("#btn_usuario_cerrar").click(function (event) {
        CerrarSesion();
    });
    consulta_numero_notificaciones();
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
  $("#tituloNotificaciones").text(JsonIdioma["TituloNotificaciones"]);
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
  $("lblNotificacionNueva").text(JsonIdioma["NotificacionNueva"]);
  $("#in_notificacion").attr("placeholder", JsonIdioma["NotificacionNueva"]);
  $("#optColorAzul").text(JsonIdioma["Azul"]);
  $("#optColorGris").text(JsonIdioma["Gris"]);
  $("#optColorVerde").text(JsonIdioma["Verde"]);
  $("#optColorRojo").text(JsonIdioma["Rojo"]);
  $("#optColorAmarillo").text(JsonIdioma["Amarillo"]);
  $("#optColorTurquesa").text(JsonIdioma["Turquesa"]);
  $("#btn_enviar").text(JsonIdioma["Guardar"]);
  $("#text_tabla_fecha").text(JsonIdioma["Fecha"]);
  $("#text_tabla_notificacion").text(JsonIdioma["NotificacionUnitaria"]);
  $("#text_tabla_tipo").text(JsonIdioma["Color"]);
  $("#text_tabla_accion").text(JsonIdioma["Opciones"]);
  $("#text_titulo_confirmacion").text(JsonIdioma["Confirmar"]);
  $("#text_confirmacion").text(JsonIdioma["EliminarNotificacion"]);
  $("#btn_si").text(JsonIdioma["Si"]);
  $("#text_titulo_actualizar_notificaciones").text(JsonIdioma["ActualizarNotificacion"]);
  $("#lb_notificacion_act").text(JsonIdioma["Contendo"]);
  $("#lb_tipo_act").text(JsonIdioma["Color"]);
  $("#optColorAzulAct").text(JsonIdioma["Azul"]);
  $("#optColorGrisAct").text(JsonIdioma["Gris"]);
  $("#optColorVerdeAct").text(JsonIdioma["Verde"]);
  $("#optColorRojoAct").text(JsonIdioma["Rojo"]);
  $("#optColorAmarilloAct").text(JsonIdioma["Amarillo"]);
  $("#optColorTurquesaAct").text(JsonIdioma["Turquesa"]);
  $("#btn_guardar_acualizar").text(JsonIdioma["Confirmar"]);
  tabla = '<thead><tr>' +
  '<th id="text_tabla_fecha">'+JsonIdioma["Fecha"]+'</th>' +
  '<th id="text_tabla_notificacion">'+JsonIdioma["NotificacionUnitaria"]+'</th>' +
  '<th id="text_tabla_tipo">'+JsonIdioma["Color"]+'</th>' +
  '<th id="text_tabla_accion">'+JsonIdioma["Opciones"]+'</th>' +
  '</tr></thead><tbody>';
  llenar_tabla();//Se necesita hacer esto despues de cargar el idioma.
}

function llenar_tabla() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "consultaNotificaciones",
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#tabla_notificaciones").empty();
      $("#tabla_notificaciones").append(tabla);
      jsonObject.forEach(row => {
        $("#tabla_notificaciones").append("<tr><td>" + row["fecha"] + "</td><td>" + row["notificacion"] + "</td><td>" + Color(row["tipo"]) + "</td><td><div class='btn-toolbar'><div class='btn-group mx-auto'><button href='#actualizar' class='btn btn-outline-success' onclick='seleccion(" + row["id"] + ", \"actualizar\");' data-toggle='modal'>Actualizar</button><button href='#confirmacion' class='btn btn-outline-danger' onclick='seleccion(" + row["id"] + ", \"eliminar\");' data-toggle='modal'>Eliminar</button></div></div></td></tr>");
      });
      $("#tabla_notificaciones").append("</tbody>");
    })
    .fail(function () {
      alert("Error");
    });
}

function realizar_accion() {
  switch (queAccion) {
    case 'eliminar':
      $("#btn_cerrar").click();
      $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "eliminarNotificacion",
          id: idSeleccionado,
          userName: getCookie("user"),
          userPass: getCookie("pass"),
          id_notificacion: idSeleccionado
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert(JsonIdioma["NotificacionEliminada"]);
            llenar_tabla();
          } else {
            alert("Error no tienes permitido realizar esa acción");
          }
        })
        .fail(function () {
          alert("Error");
        });
      break;
    case 'actualizar':
      $("#btn_cerrar_actualizar").click();
      $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "actualizarNotificacion",
          id_notificacion: idSeleccionado,
          userName: getCookie("user"),
          userPass: getCookie("pass"),
          notificacion: $("#in_usuario_act").val(),
          tipo: $("#combo_tipo_act").val(),
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert(JsonIdioma["ActualizacionCorrecta"]);
            llenar_tabla();
          } else {
            alert("Error al momento de actualizar datos no cuenta con los permisos");
          }
        })
        .fail(function () {
          alert("Error");
        });
      break;
  }

}
function seleccion(notificacion, accion) {
  idSeleccionado = notificacion;
  queAccion = accion;
  if (accion == 'actualizar') {
    cargarNotificacion();
  }

}
function cargarNotificacion() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "consultaNotificacion",
      id_notificacion: idSeleccionado
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#in_usuario_act").val(jsonObject[0]["notificacion"]);
      $("#combo_tipo_act").val(jsonObject[0]["tipo"]);
    })
    .fail(function () {
      alert("Error");
    });
}

function crear_nueva() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "crearNotificacion",
      id: idSeleccionado,
      userName: getCookie("user"),
      userPass: getCookie("pass"),
      notificacion: $("#in_notificacion").val(),
      tipo: $("#combo_tipo").val()
    },
  })
    .done(function (respuesta) {
      if (respuesta == 1) {
        alert("Notificacion Creada");
        llenar_tabla();
        $("#in_notificacion").val("");
        $("#combo_tipo").val("primary");
      } else {
        alert("Error no cuenta con los permisos para crear notificaciones");
        $("#in_notificacion").val("");
        $("#combo_tipo").val("primary");
      }
    })
    .fail(function () {
      alert("Error");
    });
}

function Color(color) {
  switch (color) {
    case 'primary':
      return JsonIdioma["Azul"];
      break;
    case 'secondary':
      return JsonIdioma["Gris"];
      break;
    case 'success':
      return JsonIdioma["Verde"];
      break;
    case 'danger':
      return JsonIdioma["Rojo"];
      break;
    case 'warning':
      return JsonIdioma["Amarillo"];
      break;
    case 'info':
      return JsonIdioma["Turquesa"];
      break;
  }
}