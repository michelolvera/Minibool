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
    if (this.value == 1) {
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
    $("#btn_cerrar").click();
    $.ajax({
      method: "post",
      url: phpPath,
      data: {
        funcion: "eliminarTodo",
        userName: getCookie("user"),
        userPass: getCookie("pass"),
      },
    })
    .done(function (respuesta) {
      if (respuesta == 1) {
        alert("Se ha eliminado a todos lo usuarios y sus datos exitosamente (excluyendo a el administrador actual)");
        llenar_tabla($("#in_nombre").val(), $("#in_apellido_pat").val(), $("#in_apellido_mat").val());
      } else {
        alert("Error al momento de actualizar datos no cuenta con los permisos");
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
  var deterministico = { tres: { puntos: "0", correctos: "0", incorrectos: "0" }, cuatro: { puntos: "0", correctos: "0", incorrectos: "0" }, cinco: { puntos: "0", correctos: "0", incorrectos: "0" } };
  var aleatorio = { tres: { puntos: "0", correctos: "0", incorrectos: "0" }, cuatro: { puntos: "0", correctos: "0", incorrectos: "0" }, cinco: { puntos: "0", correctos: "0", incorrectos: "0" } };
  $("#body_modal_detalles").empty();
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "detallesUsuarioAmd",
      idUsuario: idUsuarioSeleccionado,
      userName: getCookie("user"),
      userPass: getCookie("pass"),
      indice: 1
    },
    dataType: "json"
  })
  .done(function (jsonObject) {
    $("#body_modal_detalles").append("<p>Ultimo ingreso: " + jsonObject[0].ultimo_ingreso + "</p>");

    $.ajax({
      method: "post",
      url: phpPath,
      data: {
        funcion: "detallesUsuarioAmd",
        idUsuario: idUsuarioSeleccionado,
        userName: getCookie("user"),
        userPass: getCookie("pass"),
        indice: 2
      },
      dataType: "json"
    })
    .done(function (jsonObject) {
      if (jsonObject != 0) {
        jsonObject.forEach(element => {
          switch (element["variables"]) {
            case "Tres":
            deterministico.tres.puntos = element["total"];
            deterministico.tres.correctos = element["numero"];
            break;
            case "Cuatro":
            deterministico.cuatro.puntos = element["total"];
            deterministico.cuatro.correctos = element["numero"];
            break;
            case "Cinco":
            deterministico.cinco.puntos = element["total"];
            deterministico.cinco.correctos = element["numero"];
            break;
          }
        });
      }
      $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "detallesUsuarioAmd",
          idUsuario: idUsuarioSeleccionado,
          userName: getCookie("user"),
          userPass: getCookie("pass"),
          indice: 3
        },
        dataType: "json"
      })
      .done(function (jsonObject) {
        if (jsonObject != 0) {
          jsonObject.forEach(element => {
            switch (element["variables"]) {
              case "Tres":
              deterministico.tres.incorrectos = element["numero"];
              break;
              case "Cuatro":
              deterministico.cuatro.incorrectos = element["numero"];
              break;
              case "Cinco":
              deterministico.cinco.incorrectos = element["numero"];
              break;
            }
          });
        }
        $.ajax({
          method: "post",
          url: phpPath,
          data: {
            funcion: "detallesUsuarioAmd",
            idUsuario: idUsuarioSeleccionado,
            userName: getCookie("user"),
            userPass: getCookie("pass"),
            indice: 4
          },
          dataType: "json"
        })
        .done(function (jsonObject) {
          if (jsonObject != 0) {
            jsonObject.forEach(element => {
              switch (element["variables"]) {
                case "Tres":
                aleatorio.tres.puntos = element["total"];
                aleatorio.tres.correctos = element["numero"];
                break;
                case "Cuatro":
                aleatorio.cuatro.puntos = element["total"];
                aleatorio.cuatro.correctos = element["numero"];
                break;
                case "Cinco":
                aleatorio.cinco.puntos = element["total"];
                aleatorio.cinco.correctos = element["numero"];
                break;
              }
            });
          }
          $.ajax({
            method: "post",
            url: phpPath,
            data: {
              funcion: "detallesUsuarioAmd",
              idUsuario: idUsuarioSeleccionado,
              userName: getCookie("user"),
              userPass: getCookie("pass"),
              indice: 5
            },
            dataType: "json"
          })
          .done(function (jsonObject) {
            if (jsonObject != 0) {
              jsonObject.forEach(element => {
                switch (element["variables"]) {
                  case "Tres":
                  aleatorio.tres.incorrectos = element["numero"];
                  break;
                  case "Cuatro":
                  aleatorio.cuatro.incorrectos = element["numero"];
                  break;
                  case "Cinco":
                  aleatorio.cinco.incorrectos = element["numero"];
                  break;
                }
              });
            }
            $("#body_modal_detalles").append("<p> Puntos total = " + (parseInt(aleatorio.tres.puntos) + parseInt(aleatorio.cuatro.puntos) + parseInt(aleatorio.cinco.puntos) + parseInt(deterministico.tres.puntos) + parseInt(deterministico.cuatro.puntos) + parseInt(deterministico.cinco.puntos)) + "<p>");
            $("#body_modal_detalles").append("<p>Deterministicos: <p>");
            $("#body_modal_detalles").append("<table class='table table-striped table-bordered table-hover'>" +
              '<th>Variables </th>' +
              '<th>Correctos </th>' +
              '<th>Incorrectos </th>' +
              '<th>Puntos </th> ' +
              '<tr><td>Tres</td><td>' + deterministico.tres.correctos + '</td><td>' + deterministico.tres.incorrectos + '</td><td>' + deterministico.tres.puntos + '</td></tr>' +
              '<tr><td>Cuatro</td><td>' + deterministico.cuatro.correctos + '</td><td>' + deterministico.cuatro.incorrectos + '</td><td>' + deterministico.cuatro.puntos + '</td></tr>' +
              '<tr><td>Cinco</td><td>' + deterministico.cinco.correctos + '</td><td>' + deterministico.cinco.incorrectos + '</td><td>' + deterministico.cinco.puntos + '</td></tr>' +
              "</table>");
            $("#body_modal_detalles").append("<p>Total = " + (parseInt(deterministico.tres.puntos) + parseInt(deterministico.cuatro.puntos) + parseInt(deterministico.cinco.puntos)) + "<p>");
            $("#body_modal_detalles").append("<p>Aleatorios: <p>");
            $("#body_modal_detalles").append("<table class='table table-striped table-bordered table-hover'>" +
              '<th>Variables </th>' +
              '<th>Correctos </th>' +
              '<th>Incorrectos </th>' +
              '<th>Puntos </th> ' +
              '<tr><td>Tres</td><td>' + aleatorio.tres.correctos + '</td><td>' + aleatorio.tres.incorrectos + '</td><td>' + aleatorio.tres.puntos + '</td></tr>' +
              '<tr><td>Cuatro</td><td>' + aleatorio.cuatro.correctos + '</td><td>' + aleatorio.cuatro.incorrectos + '</td><td>' + aleatorio.cuatro.puntos + '</td></tr>' +
              '<tr><td>Cinco</td><td>' + aleatorio.cinco.correctos + '</td><td>' + aleatorio.cinco.incorrectos + '</td><td>' + aleatorio.cinco.puntos + '</td></tr>' +
              "</table>");
            $("#body_modal_detalles").append("<p>Total = " + (parseInt(aleatorio.tres.puntos) + parseInt(aleatorio.cuatro.puntos) + parseInt(aleatorio.cinco.puntos)) + "<p>");
          })
          .fail(function () {
            alert("Error");
          });
        })
.fail(function () {
  alert("Error");
});
})
.fail(function () {
  alert("Error");
});
})
.fail(function () {
  alert("Error");
});
})
.fail(function () {
  alert("Error");
});

}

function respaldarCSV() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "consultaCSV",
      userName: getCookie("user"),
      userPass: getCookie("pass"),
    },
    dataType: "json"
  })
  .done(function (jsonObject) {
    let stringCSV = ",usuario,nombre,apellido_paterno,apellido_materno,correo,pais,estudiante,escuela,carrera,semestre,administrador,ultimo_ingreso,ejercicios_correctos,total_puntos_ejercicios,ejercicios_deterministicos_correctos,total_puntos_deterministicos,ejercicios_aleatorios_correctos,total_puntos_aleatorios,tres_variables,cuatro_variables,cinco_variables%0A";
      //Manejar json aqui y agregarlo a stringCSV
      console.log(jsonObject);
      for (let i = 0; i < jsonObject.length; i++) {
        stringCSV+=jsonObject[i]["usuario"]+','+jsonObject[i]["nombre"]+','+jsonObject[i]["apellido_paterno"]+','+jsonObject[i]["apellido_materno"]+','+jsonObject[i]["correo"]+','+jsonObject[i]["pais"]+','+jsonObject[i]["estudiante"]+','+jsonObject[i]["escuela"]+','+jsonObject[i]["carrera"]+','+jsonObject[i]["semestre"]+','+jsonObject[i]["administrador"]+','+jsonObject[i]["ultimo_ingreso"]+','+jsonObject[i]["ejercicios_correctos"]+','+jsonObject[i]["total_puntos_ejercicios"]+','+jsonObject[i]["ejercicios_deterministicos_correctos"]+','+jsonObject[i]["total_puntos_deterministicos"]+','+jsonObject[i]["ejercicios_aleatorios_correctos"]+','+jsonObject[i]["total_puntos_aleatorios"]+','+jsonObject[i]["tres_variables"]+','+jsonObject[i]["cuatro_variables"]+','+jsonObject[i]["cinco_variables"]+"%0A";
      }
      document.getElementById("descargarRespaldoBtn").download = "respaldo.csv";
      document.getElementById("descargarRespaldoBtn").href = "data:text/csv;charset=UTF-8;"+stringCSV;
    })
  .fail(function () {
    alert("Error");
  });
}
