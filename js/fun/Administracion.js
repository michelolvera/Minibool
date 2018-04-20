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

function CargarFunciones() {
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
}

function ValidarCookie() {

}

function CargarTextosPagina() {

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
            console.log("si");
            alert(JsonIdioma["EliminadoExitoso"]);
          } else {
            console.log("no");
            alert(JsonIdioma["EliminadoFallido"]);
          }
        })
        .fail(function () {
          alert("Error");
        });
      llenar_tabla($("#in_nombre").val(), $("#in_apellido_pat").val(), $("#in_apellido_mat").val());
      break;
    case 'eliminarTodo':
      alert("eliminar todo");
      break;
    case 'actualizar':
      $("#btn_cerrar_actualizar").click();
      /*$.ajax({
        method: "post",
        url: phpPath,
        data: { 
          funcion: "actualizarUsuario", 
          idUsuario: idUsuarioSeleccionado, 
          userName: getCookie("user"), 
          userPass: getCookie("pass"), 
          nombreUsuario: $("#in_usuario").val(), 
          nombreReal: $("#in_nombre_act").val(), 
          apellidoP: $("#in_apellido_pat_act").val(), 
          apellidoM: $("#in_apellido_mat_act").val(), 
          correoElectronico: $("#in_correo_act").val(), 
          administrador, 
          codigoPais: $("#combo_pais_act").val(), 
          esEstudiante, 
          nombreEscuela:$("#in_escuela_act").val(), 
          nombreCarrera:$("#in_carrera_act").val(), 
          numSemestre:$("#in_semestre_act").val() 
        },
      })
        .done(function (respuesta) {
          if (respuesta == 1) {
            alert("Datos actualiazados exitozamente");
          } else {
            alert("Error al momento de actualizar datos no cuenta con los permisos");
          }
        })
        .fail(function () {
          alert("Error");
        });*/
      break;
  }
}
function seleccion(usuario, accion) {
  idUsuarioSeleccionado = usuario;
  queAccion = accion;
  console.log("selecionados " + idUsuarioSeleccionado + " " + queAccion);
  if (accion == 'actualizar') {
    cargarUsuario();
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
    data: { funcion: "consultarUsuario",
      idUsuario: idUsuarioSeleccionado,
      userName: getCookie("user"),
      userPass: getCookie("pass")},
    dataType: "json"
  })
    .done(function (jsonObject) {
      console.log(jsonObject);
      $("#in_usuario").val(jsonObject[0]["usuario"]);
      $("#in_nombre_act").val(jsonObject[0]["nombre"]);
      $("#in_apellido_pat_act").val(jsonObject[0]["apellido_paterno"]);
      $("#in_apellido_mat_act").val(jsonObject[0]["apellido_materno"]);
      $("#in_correo_act").val(jsonObject[0]["correo"]);
      console.log(jsonObject[0]["administrador"]);
      if (jsonObject[0]["administrador"] == 1) {
        $("#in_administrador_act").prop('checked', true);
        console.log("si");
      }
      else {
        $("#in_administrador_act").prop('checked', false);
        console.log("no")
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
