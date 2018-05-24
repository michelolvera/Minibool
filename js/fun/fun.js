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
        $("#lista_notificaciones").append("<tr><td style='width: 80%;'><div class='alert alert-secondary' role='alert'>" + row["usuario"] + "</div></td><td style='width: 20%;'><div class='alert alert-secondary' role='alert'>" + row["total"] + "</div></td></tr>");
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