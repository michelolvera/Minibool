function CargarFunciones() {
  $("#login_form").submit(function (event) {
    var usuario = $("#in_usuario").val();
    var contraseña = $("#in_contrasena").val();
    $.ajax({
      method: "POST",
      url: "php/Selector.php",
      data: { funcion: "login", userName: usuario, userPass: contraseña }
    })
    .done(function (msg) {
      if (msg == 1) {
        if($("#in_recordar").is(":checked")){
          setCookie("user", usuario, 30);
          setCookie("pass", contraseña, 30);
        }else {
          setCookie("user", usuario, 0);
          setCookie("pass", contraseña, 0);
        }
        location.href = "principal.html";
      } else {
        alert(JsonIdioma["loginFallido"]);
      }
    });
  });
}

function ValidarCookie() {
  if(getCookie("user") != "" && getCookie("pass") != ""){
    location.href = "principal.html";
  }
}

function cargarTextosPagina(){

}
