var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var idUsuarioSeleccionado = 0;
var queAccion = "";
var tabla = '<tr>' +
  '<th id="text_tabla_nombre">Nombre</th>' +
  '<th id="text_tabla_apellido_pat">Apellido paterno</th>' +
  '<th id="text_tabla_apellido_mat">Apellido materno</th>' +
  '<th id="text_tabla_accion">Accion</th> ' +
  '</tr>';
var homePath = "../../";


function CargarFunciones() {
  Inicializacion();
}

function Inicializacion() {
  llenar_tabla("", "", "");

  $("#btn_busqueda").click(function (event) {
    llenar_tabla($("#in_nombre").val(), $("#in_apellido_pat").val(), $("#in_apellido_mat").val());
  });

  $("input[type=radio][name=in_estudia_si]").change(function (event) {
    if (this.value == 1) {
      $("#PreguntasEstudiante").css("display", "block");
    } else {
      $("#PreguntasEstudiante").css("display", "none");
    }
  });

  $('#in_administrador_act').change(function (event) {
    if ($('#in_administrador_act').val("1") == 1) {
      $('#in_administrador_act').val("0");
    } else {
      $('#in_administrador_act').val("1");
    }
  })
}

function ValidarCookie() {
  comprobarAdminPagina();
}

function CargarTextosPagina() {
  $("#btn_dd_usuario_actual").text(JsonIdioma["Usuario"] + ": " + getCookie("user"));
}

function llenar_tabla(nombre, apellidoPat, apellidoMat) {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "consultaUsuarios",
      likeNombre: nombre,
      likeApellidoPat: apellidoPat,
      likeApellidoMat: apellidoMat
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#tabla").empty();
      $("#tabla").append(tabla);
      jsonObject.forEach(row => {
        $("#tabla").append("<tr><td>" + row["nombre"] + "</td><td>" + row["apellido_paterno"] + "</td><td>" + row["apellido_materno"] + "</td><td><div class='btn-toolbar'><div class='btn-group'><button href='#detalles' class='btn btn-outline-info' onclick='seleccion(" + row["id_usuario"] + ", \"detalles\");' data-toggle='modal'>Detalles</button><button href='#actualizar' class='btn btn-outline-success' onclick='seleccion(" + row["id_usuario"] + ", \"actualizar\");' data-toggle='modal'>Actualizar</button><button href='#confirmacion' class='btn btn-outline-danger' onclick='seleccion(" + row["id_usuario"] + ", \"eliminar\");' data-toggle='modal'>Eliminar</button></div></div></td></tr>");
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
          funcion: "eliminarUsuario",
          idUsuario: idUsuarioSeleccionado,
          userName: getCookie("user"),
          userPass: getCookie("pass")
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert(JsonIdioma["EliminadoExitoso"]);
            llenar_tabla($("#in_nombre").val(), $("#in_apellido_pat").val(), $("#in_apellido_mat").val());
          } else {
            alert(JsonIdioma["EliminadoFallido"]);
          }
        })
        .fail(function () {
          alert("Error");
        });
      break;
    case 'eliminarTodo':
      alert("eliminar todo");
      break;
    case 'actualizar':
      $("#btn_cerrar_actualizar").click();
      $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "actualizarUsuario",
          idUsuario: idUsuarioSeleccionado,
          userName: getCookie("user"),
          userPass: getCookie("pass"),
          numSemestre: $("#in_semestre_act").val(),
          nombreCarrera: $("#in_carrera_act").val(),
          nombreEscuela: $("#in_escuela_act").val(),
          esEstudiante: $('[name=in_estudia_si]:checked').val(),
          codigoPais: $("#combo_pais_act").val(),
          administrador: $("#in_administrador_act").val(),
          correoElectronico: $("#in_correo_act").val(),
          apellidoM: $("#in_apellido_mat_act").val(),
          apellidoP: $("#in_apellido_pat_act").val(),
          nombreReal: $("#in_nombre_act").val(),
          nombreUsuario: $("#in_usuario").val(),
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
function seleccion(usuario, accion) {
  idUsuarioSeleccionado = usuario;
  queAccion = accion;
  if (accion == 'actualizar') {
    cargarUsuario();
  }
  if (accion == 'detalles') {
    cargar_detalles();
  }
}

function cargarUsuario() {
  $("#in_usuario").val("");
  $("#in_nombre_act").val("");
  $("#in_apellido_pat_act").val("");
  $("#in_apellido_mat_act").val("");
  $("#in_correo_act").val("");
  $("#in_escuela_act").val("");
  $("#in_carrera_act").val("");
  $("#in_semestre_act").val("");
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "consultarUsuario",
      idUsuario: idUsuarioSeleccionado,
      userName: getCookie("user"),
      userPass: getCookie("pass")
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#in_usuario").val(jsonObject[0]["usuario"]);
      $("#in_nombre_act").val(jsonObject[0]["nombre"]);
      $("#in_apellido_pat_act").val(jsonObject[0]["apellido_paterno"]);
      $("#in_apellido_mat_act").val(jsonObject[0]["apellido_materno"]);
      $("#in_correo_act").val(jsonObject[0]["correo"]);
      if (jsonObject[0]["administrador"] == 1) {
        $("#in_administrador_act").prop('checked', true);
        $("#in_administrador_act").val("1");
      }
      else {
        $("#in_administrador_act").prop('checked', false);
        $("#in_administrador_act").val("0");
      }
      $("#combo_pais_act").val(jsonObject[0]["pais"]);
      if (jsonObject[0]["estudiante"] == 1) {
        $("input[type=radio][name=in_estudia_si]")[0].checked = true;
        $("#PreguntasEstudiante").css("display", "block");
        $("#in_escuela_act").val(jsonObject[0]["escuela"]);
        $("#in_carrera_act").val(jsonObject[0]["carrera"]);
        $("#in_semestre_act").val(jsonObject[0]["semestre"]);
      } else {
        $('input[type=radio][name=in_estudia_si]')[1].checked = true;
        $("#PreguntasEstudiante").css("display", "none");
      }

    })
    .fail(function () {
      alert("Error");
    });
}
function cargar_detalles() {
  $("#lb_ultimo_acceso").empty();
  $("#lb_ultimo_acceso").append("no se xD solo se que su id es: " + idUsuarioSeleccionado);
}