var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var tabla = '<tr>' +
  '<th id="text_tabla_fecha">Fecha</th>' +
  '<th id="text_tabla_notificacion">Notificación</th>' +
  '<th id="text_tabla_tipo">Color</th>' +
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
      $("#tabla_notificaciones").empty();
      $("#tabla_notificaciones").append(tabla);
      jsonObject.forEach(row => {
        $("#tabla_notificaciones").append("<tr><td>" + row["fecha"] + "</td><td>" + row["notificacion"] + "</td><td>" + Color(row["tipo"])  + "</td><td><div class='btn-toolbar'><div class='btn-group'><button href='#actualizar' class='btn btn-outline-success' onclick='seleccion(" + row["id"] + ", \"actualizar\");' data-toggle='modal'>Actualizar</button><button href='#confirmacion' class='btn btn-outline-danger' onclick='seleccion(" + row["id"] + ", \"eliminar\");' data-toggle='modal'>Eliminar</button></div></div></td></tr>");
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
          userPass: getCookie("pass"),
          id_notificacion: idSeleccionado
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
          id_notificacion: idSeleccionado,
          userName: getCookie("user"),
          userPass: getCookie("pass"),
          notificacion:$("#in_usuario_act").val(), 
          tipo: $("#combo_tipo_act").val(),
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert("Datos actualiazados exitozamente");
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
function cargarNotificacion(){
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
      console.log(jsonObject);
      $("#in_usuario_act").val(jsonObject[0]["notificacion"]);
      $("#combo_tipo_act").val(jsonObject[0]["tipo"]);
    })
    .fail(function () {
      alert("Error");
    });
}

function crear_nueva(){
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

function Color(color){
  switch(color){
    case 'primary':
    return "Azul";
    break;
    case 'secondary':
    return "Gris";
    break;
    case 'success':
    return "Verde";
    break;
    case 'danger':
    return "Rojo";
    break;
    case 'warning':
    return "Azul";
    break;
    case 'info':
    return "Turquesa";
    break;
  }
}