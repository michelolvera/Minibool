var phpPath = "../../php/Selector.php";
var langPath = "../../json/string.json";
var idUsuarioSeleccionado = 0;
var queAccion = "";
var tabla = "";
var homePath = "../../";


function CargarFunciones() {
  $("#btn_usuario_cerrar").click(function (event) {
    CerrarSesion();
  });
  consulta_numero_notificaciones();
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
  $("#tituloUsuarios").text(JsonIdioma["TituloUsuarios"]);
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
  $("#lb_buscar").text(JsonIdioma["BuscarPor"]);
  $("#lb_nombre_bus").text(JsonIdioma["Nombre"]);
  $("#lb_apellido_pat_bus").text(JsonIdioma["ApellidoPaterno"]);
  $("#lb_apellido_mat_bus").text(JsonIdioma["ApellidoMaterno"]);
  $("#btn_busqueda").text(JsonIdioma["Buscar"]);
  $("#in_nombre").attr("placeholder", JsonIdioma["Nombre"]);
  $("#in_apellido_pat").attr("placeholder", JsonIdioma["ApellidoPaterno"]);
  $("#in_apellido_mat").attr("placeholder", JsonIdioma["ApellidoMaterno"]);
  $("#btn_respaldar_todo").text(JsonIdioma["GuardarCopia"]);
  $("#btn_eliminar_todo").text(JsonIdioma["EliminarUsuarios"]);
  $("#text_titulo_confirmacion").text(JsonIdioma["Confirmar"]);
  $("#text_confirmacion").text(JsonIdioma["ConfirmarAccion"]);
  $("#btn_si").text(JsonIdioma["Si"]);
  $("#text_titulo_actualizar").text(JsonIdioma["ConfigurarCuenta"]);
  $("#lb_usuario").text(JsonIdioma["Usuario"]);
  $("#lb_nombre").text(JsonIdioma["Nombre"]);
  $("#lb_apellido_pat").text(JsonIdioma["ApellidoPaterno"]);
  $("#lb_apellido_mat").text(JsonIdioma["ApellidoMaterno"]);
  $("#lb_correo").text(JsonIdioma["CorreoElectronico"]);
  $("#lb_contrasenia").text(JsonIdioma["Pass"]);
  $("#lb_pais").text(JsonIdioma["Pais"]);
  $("#sp_estudiante").text(JsonIdioma["EstudiantePregunta"]);
  $("#lb_estudia_si").text(JsonIdioma["Si"]);
  $("#lb_estudia_no").text(JsonIdioma["No"]);
  $("#lb_escuela").text(JsonIdioma["Escuela"]);
  $("#lb_carrera").text(JsonIdioma["Especialidad"]);
  $("#lb_semestre").text(JsonIdioma["Semestre"]);
  $("#lb_administrador").text(JsonIdioma["Administrador"]);
  $("#btn_guardar_acualizar").text(JsonIdioma["Actualizar"]);
  $("#titulo_respaldo").text(JsonIdioma["GuardarCopia"]);
  $("#descargarRespaldoBtn").text(JsonIdioma["Descargar"]);
  tabla = '<thead><tr>' +
    '<th id="text_tabla_nombre">' + JsonIdioma["Nombre"] + '</th>' +
    '<th id="text_tabla_apellido_pat">' + JsonIdioma["ApellidoPaterno"] + '</th>' +
    '<th id="text_tabla_apellido_mat">' + JsonIdioma["ApellidoMaterno"] + '</th>' +
    '<th id="text_tabla_accion">' + JsonIdioma["Opciones"] + '</th> ' +
    '</tr></thead><tbody>';
  Inicializacion();
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
        $("#tabla").append("<tr><td>" + row["nombre"] + "</td><td>" + row["apellido_paterno"] + "</td><td>" + row["apellido_materno"] + "</td><td><div class='btn-toolbar'><div class='btn-group mx-auto'><button href='#detalles' class='btn btn-outline-info' onclick='seleccion(" + row["id_usuario"] + ", \"detalles\");' data-toggle='modal'>" + JsonIdioma["Detalles"] + "</button><button href='#actualizar' class='btn btn-outline-success' onclick='seleccion(" + row["id_usuario"] + ", \"actualizar\");' data-toggle='modal'>" + JsonIdioma["Actualizar"] + "</button><button href='#confirmacion' class='btn btn-outline-danger' onclick='seleccion(" + row["id_usuario"] + ", \"eliminar\");' data-toggle='modal'>" + JsonIdioma["Eliminar"] + "</button></div></div></td></tr>");
      });
      $("#tabla").append("</tbody>");
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
            alert(JsonIdioma["EliminadoUsuarios"]);
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
          contrasena: $("#in_contrasenia_act").val(),
          apellidoM: $("#in_apellido_mat_act").val(),
          apellidoP: $("#in_apellido_pat_act").val(),
          nombreReal: $("#in_nombre_act").val(),
          nombreUsuario: $("#in_usuario").val(),
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert(JsonIdioma["ActualizacionCorrecta"]);
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
  $("#in_contrasenia_act").val("");
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
      $("#in_contrasenia_act").val(jsonObject[0]["contrasena"]);
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
      $("#body_modal_detalles").append("<p>"+JsonIdioma["UltimoIngreso"]+": " + jsonObject[0].ultimo_ingreso + "</p>");

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
                      $("#body_modal_detalles").append("<p>" + JsonIdioma["PuntajeTotal"] + " = " + (parseInt(aleatorio.tres.puntos) + parseInt(aleatorio.cuatro.puntos) + parseInt(aleatorio.cinco.puntos) + parseInt(deterministico.tres.puntos) + parseInt(deterministico.cuatro.puntos) + parseInt(deterministico.cinco.puntos)) + "<p>");
                      $("#body_modal_detalles").append("<p>" + JsonIdioma["Conocido"] + ": <p>");
                      $("#body_modal_detalles").append("<table class='table text-center table-hover'><thead>" +
                        '<th>' + JsonIdioma["Variables"] + '</th>' +
                        '<th>' + JsonIdioma["Correctos"] + '</th>' +
                        '<th>' + JsonIdioma["Incorrectos"] + '</th>' +
                        '<th>' + JsonIdioma["Puntaje"] + '</th></thead><tbody>' +
                        '<tr><td>3</td><td>' + deterministico.tres.correctos + '</td><td>' + deterministico.tres.incorrectos + '</td><td>' + deterministico.tres.puntos + '</td></tr>' +
                        '<tr><td>4</td><td>' + deterministico.cuatro.correctos + '</td><td>' + deterministico.cuatro.incorrectos + '</td><td>' + deterministico.cuatro.puntos + '</td></tr>' +
                        '<tr><td>5</td><td>' + deterministico.cinco.correctos + '</td><td>' + deterministico.cinco.incorrectos + '</td><td>' + deterministico.cinco.puntos + '</td></tr>' +
                        "</tbody></table>");
                      $("#body_modal_detalles").append("<p>" + JsonIdioma["Total"] + " = " + (parseInt(deterministico.tres.puntos) + parseInt(deterministico.cuatro.puntos) + parseInt(deterministico.cinco.puntos)) + "<p>");
                      $("#body_modal_detalles").append("<p>" + JsonIdioma["Aleatorio"] + ": <p>");
                      $("#body_modal_detalles").append("<table class='table text-center table-hover'><thead>" +
                        '<th>' + JsonIdioma["Variables"] + '</th>' +
                        '<th>' + JsonIdioma["Correctos"] + '</th>' +
                        '<th>' + JsonIdioma["Incorrectos"] + '</th>' +
                        '<th>' + JsonIdioma["Puntaje"] + '</th></thead><tbody>' +
                        '<tr><td>3</td><td>' + aleatorio.tres.correctos + '</td><td>' + aleatorio.tres.incorrectos + '</td><td>' + aleatorio.tres.puntos + '</td></tr>' +
                        '<tr><td>4</td><td>' + aleatorio.cuatro.correctos + '</td><td>' + aleatorio.cuatro.incorrectos + '</td><td>' + aleatorio.cuatro.puntos + '</td></tr>' +
                        '<tr><td>5</td><td>' + aleatorio.cinco.correctos + '</td><td>' + aleatorio.cinco.incorrectos + '</td><td>' + aleatorio.cinco.puntos + '</td></tr>' +
                        "</tbody></table>");
                      $("#body_modal_detalles").append("<p>" + JsonIdioma["Total"] + " = " + (parseInt(aleatorio.tres.puntos) + parseInt(aleatorio.cuatro.puntos) + parseInt(aleatorio.cinco.puntos)) + "<p>");
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
        stringCSV += jsonObject[i]["usuario"] + ',' + jsonObject[i]["nombre"] + ',' + jsonObject[i]["apellido_paterno"] + ',' + jsonObject[i]["apellido_materno"] + ',' + jsonObject[i]["correo"] + ',' + jsonObject[i]["pais"] + ',' + jsonObject[i]["estudiante"] + ',' + jsonObject[i]["escuela"] + ',' + jsonObject[i]["carrera"] + ',' + jsonObject[i]["semestre"] + ',' + jsonObject[i]["administrador"] + ',' + jsonObject[i]["ultimo_ingreso"] + ',' + jsonObject[i]["ejercicios_correctos"] + ',' + jsonObject[i]["total_puntos_ejercicios"] + ',' + jsonObject[i]["ejercicios_deterministicos_correctos"] + ',' + jsonObject[i]["total_puntos_deterministicos"] + ',' + jsonObject[i]["ejercicios_aleatorios_correctos"] + ',' + jsonObject[i]["total_puntos_aleatorios"] + ',' + jsonObject[i]["tres_variables"] + ',' + jsonObject[i]["cuatro_variables"] + ',' + jsonObject[i]["cinco_variables"] + "%0A";
      }
      document.getElementById("descargarRespaldoBtn").download = "respaldo.csv";
      document.getElementById("descargarRespaldoBtn").href = "data:text/csv;charset=UTF-8;" + stringCSV;
    })
    .fail(function () {
      alert("Error");
    });
}
