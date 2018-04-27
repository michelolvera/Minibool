var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var tabla = '<tr>' +
  '<th id="text_tabla_fecha">Fecha</th>' +
  '<th id="text_tabla_notificacion">Notificación</th>' +
  '<th id="text_tabla_tipo">Tipo</th>' +
  '<th id="text_tabla_accion">Accion</th>' +
  '</tr>';
var idSeleccionado='';
var queAccion='';


function CargarFunciones() {
  inicializar();
}

function ValidarCookie() {
  comprobarAdminPagina();
}

function CargarTextosPagina() {

}
function inicializar() {
  llenar_tabla();
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
      console.log(jsonObject);
      $("#tabla_notificaciones").empty();
      $("#tabla_notificaciones").append(tabla);
      jsonObject.forEach(row => {
        $("#tabla_notificaciones").append("<tr><td>" + row["fecha"] + "</td><td>" + row["notificacion"] + "</td><td>" + row["tipo"] + "</td><td><div class='btn-toolbar'><div class='btn-group'><button href='#actualizar' class='btn btn-outline-success' onclick='seleccion(" + row["id"] + ", \"actualizar\");' data-toggle='modal'>Actualizar</button><button href='#confirmacion' class='btn btn-outline-danger' onclick='seleccion(" + row["id"] + ", \"eliminar\");' data-toggle='modal'>Eliminar</button></div></div></td></tr>");
      });
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
          userPass: getCookie("pass")
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert("Notficacion Eliminada");
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
          id: idSeleccionado,
          userName: getCookie("user"),
          userPass: getCookie("pass"),
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert("Datos actualiazados exitozamente");
            llenar_tabla($("#in_nombre").val(), $("#in_apellido_pat").val(), $("#in_apellido_mat").val());
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
function cargarNotificacion(){
  
}