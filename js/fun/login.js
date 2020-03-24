var langPath = "json/string.json";
var phpPath = "php/Selector.php";

function CargarFunciones() {
  CargarListaIdiomas();
  $("#login_form").submit(function (event) {
    var usuario = $("#in_usuario").val();
    var contraseña = $("#in_contrasena").val();
    $.ajax({
      method: "POST",
      url: phpPath,
      data: { funcion: "login", userName: usuario, userPass: contraseña }
    })
      .done(function (msg) {
        if (msg == 1) {
          if ($("#in_recordar").is(":checked")) {
            setCookie("user", usuario, 30);
            setCookie("pass", contraseña, 30);
          } else {
            setCookie("user", usuario, 0);
            setCookie("pass", contraseña, 0);
          }
          location.href = "principal/";
        } else {
          alert(JsonIdioma["loginFallido"]);
        }
      });
  });

  $("#combo_lang").change(function (event) {
    setCookie("lang", this.value, 30);
    CargarIdioma(this.value);
  });
}

function ValidarCookie() {
  if (getCookie("user") != "" && getCookie("pass") != "") {
    location.href = "principal/";
  }
}

function CargarTextosPagina() {
  $("#titulo").text(JsonIdioma["tituloLogin"]);
  $("#titulo_h2").text(JsonIdioma["tituloLogin"]);
  $("#lb_usuario").text(JsonIdioma["Usuario"] + ":");
  $("#in_usuario").attr("placeholder", JsonIdioma["Usuario"] + ":");
  $("#lb_contrasena").text(JsonIdioma["Pass"] + ":");
  $("#in_contrasena").attr("placeholder", JsonIdioma["Pass"] + ":");
  $("#lb_recordar").text(JsonIdioma["RecordarPass"]);
  $("#btn_acceso").text(JsonIdioma["IniciarSesion"]);
  $("#btn_olvido_contrasena").text(JsonIdioma["OlvidastePass"]);
  $("#lb_no_cuenta").text(JsonIdioma["SinCuenta"]);
  $("#btn_crear_cuenta").text(JsonIdioma["CreaCuenta"]);
  $("#lb_lang").text(JsonIdioma["Idioma"] + ":");
  $("#btn_acercade").text(JsonIdioma["AcercaDe"]);
  $("#text_titulo_acercade_principal").text(JsonIdioma["AcercaDe"]);
  $("#AcercaDeModal").text(JsonIdioma["Descripcion"]);
  $("#profesoresColab").text(JsonIdioma["ProfColab"]);
  $("#joseDesc").text(JsonIdioma["JoseDesc"]);
  $("#octavioDesc").text(JsonIdioma["OctavioDesc"]);
  $("#nellyDesc").text(JsonIdioma["NellyDesc"]);
  $("#miriamDesc").text(JsonIdioma["MiriamDesc"]);
  $("#hannaDesc").text(JsonIdioma["HannaDesc"]);
  $("#fridaDesc").text(JsonIdioma["FridaDesc"]);
  $("#marioDesc").text(JsonIdioma["MarioDesc"]);
  $("#desarrolladores").text(JsonIdioma["Desarrolladores"]);
  $("#descJorge").text(JsonIdioma["DescJorge"]);
  $("#descMichel").text(JsonIdioma["DescMichel"]);
  $("#descAlan").text(JsonIdioma["DescAlan"]);
}

function CargarListaIdiomas() {
  $.ajax({
    method: "post",
    url: langPath,
    dataType: "json"
  })
    .done(function (jsonObject) {
      $("#combo_lang").empty();
      for (var lang in jsonObject) {
        $("#combo_lang").append("<option value='" + lang + "'>" + jsonObject[lang]["nombreIdioma"] + "</option>");
      }
      $("#combo_lang").val(getCookie("lang"));
    });
}