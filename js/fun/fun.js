//Variables Globales
var JsonIdioma;

//El documento se ha cargado completamente, ahora se puede añadir funcionamiento.
$(document).ready(function () {
  //Validar Cookie de usuario
  ValidarCookie();//Cada pagina maneja esto de manera diferente.
  //Cargar cookie de Idioma
  var lang = getCookie("lang");
  if (lang != "") {
    CargarIdioma(lang);
  } else {
    CargarIdioma("es-MX");
    lang = "es-MX"
  }
  setCookie("lang", lang, 30);
  CargarFunciones();
  $("#btn_usuario_cerrar").click(function (event) {
    CerrarSesion();
  });
  consulta_numero_notificaciones();
});

function CargarIdioma(idioma) {
  $.ajax({
    method: "post",
    url: langPath,
    dataType: "json"
  })
    .done(function (jsonObject) {
      JsonIdioma = jsonObject[idioma];
      CargarTextosPagina();
    })
    .fail(function () {
      alert("Error: Idioma no cargado, recargar pagina.");
    });
}

function ComprobarRegex(regex, expresion) {
  return regex.test(expresion);
}

function setCookie(cname, cvalue, exdays) {
  if (exdays != 0) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  } else
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function cargar_notificaciones() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "consultaNotificaciones",
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#lista_notificaciones").empty();
      jsonObject.forEach(row => {
        $("#lista_notificaciones").append("<div class='alert alert-" + row["tipo"] + "' role='alert'>" + row["notificacion"] + "</div>");
      });
    })
    .fail(function () {
      alert("Error");
    });
}

function consulta_numero_notificaciones() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "consultaNumeroNotificaciones",
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#btn_mostrar_notificaciones span").text(jsonObject[0]["suma"]);
    })
    .fail(function () {
      alert("Error");
    });
}

function cargar_ranking() {
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "obtenerRanking",
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#lista_notificaciones").empty();
      jsonObject.forEach(row => {
        $("#lista_notificaciones").append("<tr><td><div class='alert alert-info' role='alert'>" + row["usuario"] + "</div></td><td style='width: 20%; text-align: center;'><div class='alert alert-info' role='alert'>" + row["total"] + "</div></td></tr>");
      });
    })
    .fail(function () {
      alert("Error");
    });
}

function CerrarSesion() {
  setCookie("user", "", -1);
  setCookie("pass", "", -1);
  location.replace(homePath);
}

function cargar_datos_usuario() {
  $("#in_usuario_gestion").val("");
  $("#in_nombre_act_gestion").val("");
  $("#in_apellido_pat_act_gestion").val("");
  $("#in_apellido_mat_act_gestion").val("");
  $("#in_correo_act_gestion").val("");
  $("#in_escuela_act_gestion").val("");
  $("#in_carrera_act_gestion").val("");
  $("#in_semestre_act_gestion").val("");
  $.ajax({
    method: "post",
    url: phpPath,
    data: {
      funcion: "GestionarUsuario",
      userName: getCookie("user"),
      userPass: getCookie("pass")
    },
    dataType: "json"
  })
    .done(function (jsonObject) {
      console.log(jsonObject);
      $("#in_usuario_gestion").val(jsonObject[0]["usuario"]);
      $("#in_nombre_act_gestion").val(jsonObject[0]["nombre"]);
      $("#in_apellido_pat_act_gestion").val(jsonObject[0]["apellido_paterno"]);
      $("#in_apellido_mat_act_gestion").val(jsonObject[0]["apellido_materno"]);
      $("#in_correo_act_gestion").val(jsonObject[0]["correo"]);
      $("#combo_pais_act_gestion").val(jsonObject[0]["pais"]);
      if (jsonObject[0]["estudiante"] == 1) {
        $("input[type=radio][name=in_estudia_si_gestion]")[0].checked = true;
        $("#PreguntasEstudiante_gestion").css("display", "block");
        $("#in_escuela_act_gestion").val(jsonObject[0]["escuela"]);
        $("#in_carrera_act_gestion").val(jsonObject[0]["carrera"]);
        $("#in_semestre_act_gestion").val(jsonObject[0]["semestre"]);
      } else {
        $('input[type=radio][name=in_estudia_si_gestion]')[1].checked = true;
        $("#PreguntasEstudiante_gestion").css("display", "none");
      }

    })
    .fail(function () {
      alert("Error");
    });
}

function guardar_datos_usuario(){
  $("#btn_cerrar_usuario_gestion").click();
      $.ajax({
        method: "post",
        url: phpPath,
        data: {
          funcion: "guardarUsuario",
          userName: getCookie("user"),
          userPass: getCookie("pass"),
          numSemestre: $("#in_semestre_act_gestion").val(),
          nombreCarrera: $("#in_carrera_act_gestion").val(),
          nombreEscuela: $("#in_escuela_act_gestion").val(),
          esEstudiante: $('[name=in_estudia_si_gestion]:checked').val(),
          codigoPais: $("#combo_pais_act_gestion").val(),
          correoElectronico: $("#in_correo_act_gestion").val(),
          apellidoM: $("#in_apellido_mat_act_gestion").val(),
          apellidoP: $("#in_apellido_pat_act_gestion").val(),
          nombreReal: $("#in_nombre_act_gestion").val(),
          nombreUsuario: $("#in_usuario_gestion").val(),
        },
      })
        .done(function (respuesta) {

          if (respuesta == 1) {
            alert("Datos actualiazados exitozamente");
          } else {
            alert("Error al momento de actualizar datos");
          }
        })
        .fail(function () {
          alert("Error");
        });
}